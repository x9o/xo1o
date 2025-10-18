-- advanced placement system by xo1o

local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local mouse = player:GetMouse()
local camera = workspace.CurrentCamera

local placementState

local Config = {
	placementKey = Enum.KeyCode.E,
	rotationKey = Enum.KeyCode.R,
	partSwitchKeys = {
		BasePart = Enum.KeyCode.One,
		WedgePart = Enum.KeyCode.Two,
		TrussPart = Enum.KeyCode.Three
	},
	maxPlacementDistance = 100,
	gridSize = 1,
	rotationIncrement = 90,
	tweenDuration = 0.1,
	raycastParams = RaycastParams.new(),
	silhouetteTransparency = 0.7,
	collisionCheckEnabled = true,
	debugMode = false
}

Config.raycastParams.FilterType = Enum.RaycastFilterType.Exclude

function Config:updateRaycastFilter()
	local filterList = {player.Character}
	if placementState and placementState.silhouette then
		table.insert(filterList, placementState.silhouette)
	end
	self.raycastParams.FilterDescendantsInstances = filterList
end

Config:updateRaycastFilter()

local PlacementState = {}
PlacementState.__index = PlacementState

function PlacementState.new()
	local self = setmetatable({}, PlacementState)
	self.isPlacing = false
	self.currentRotation = 0
	self.silhouette = nil
	self.highlight = nil
	self.canPlace = false
	self.lastPosition = Vector3.new()
	self.targetRotation = 0
	self.rotationTween = nil
	self.partType = "BasePart"  -- DEFAULT
	return self
end

function PlacementState:cleanup()
	if self.silhouette then
		self.silhouette:Destroy()
		self.silhouette = nil
	end
	if self.highlight then
		self.highlight:Destroy()
		self.highlight = nil
	end
	if self.rotationTween then
		self.rotationTween:Cancel()
		self.rotationTween = nil
	end
	self.currentRotation = 0
	self.targetRotation = 0

	-- update filter after cleanup
	Config:updateRaycastFilter()
end

placementState = PlacementState.new()

local CFrameUtility = {}

function CFrameUtility.snapToGrid(position, gridSize)
	return Vector3.new(
		math.floor(position.X / gridSize + 0.5) * gridSize,
		position.Y,
		math.floor(position.Z / gridSize + 0.5) * gridSize
	)
end

function CFrameUtility.lerpRotation(current, target, alpha)
	local currentCF = CFrame.Angles(0, math.rad(current), 0)
	local targetCF = CFrame.Angles(0, math.rad(target), 0)
	return currentCF:Lerp(targetCF, alpha)
end

local RaycastHandler = {}

function RaycastHandler.castFromMouse(params)
	local unitRay = camera:ScreenPointToRay(mouse.X, mouse.Y)
	local direction = unitRay.Direction * Config.maxPlacementDistance

	return workspace:Raycast(unitRay.Origin, direction, params)
end

function RaycastHandler.getValidPlacementPosition()
	-- update filter before raycasting
	Config:updateRaycastFilter()

	local raycastResult = RaycastHandler.castFromMouse(Config.raycastParams)

	if raycastResult then
		local snappedPosition = CFrameUtility.snapToGrid(raycastResult.Position, Config.gridSize)
		return snappedPosition, raycastResult.Normal, raycastResult.Instance
	end

	return nil, nil, nil
end

local CollisionDetector = {}

function CollisionDetector.checkOverlap(part)
	if not Config.collisionCheckEnabled then
		return false
	end

	local overlapParams = OverlapParams.new()
	overlapParams.FilterType = Enum.RaycastFilterType.Exclude
	overlapParams.FilterDescendantsInstances = {part, player.Character}

	local region = part.CFrame
	local size = part.Size * 0.99  -- slightly shrink to avoid edge detection issues

	local partsInRegion = workspace:GetPartBoundsInBox(region, size, overlapParams)

	for _, overlappingPart in ipairs(partsInRegion) do
		-- ignore terrain, the silhouette itself, and player character
		if overlappingPart ~= part 
			and not overlappingPart:IsDescendantOf(player.Character) 
			and overlappingPart.ClassName ~= "Terrain" then
			return true
		end
	end

	return false
end

local VisualFeedback = {}

function VisualFeedback.createSilhouette(template)
	local silhouette = template:Clone()
	silhouette.Transparency = Config.silhouetteTransparency
	silhouette.CanCollide = false
	silhouette.Anchored = true
	silhouette.Parent = workspace

	return silhouette
end

function VisualFeedback.createHighlight(parent)
	local highlight = Instance.new("Highlight")
	highlight.FillTransparency = 0.5
	highlight.OutlineTransparency = 0
	highlight.FillColor = Color3.fromRGB(0, 255, 0)
	highlight.OutlineColor = Color3.fromRGB(0, 200, 0)
	highlight.Parent = parent

	return highlight
end

function VisualFeedback.updateHighlightColor(highlight, canPlace)
	if canPlace then
		highlight.FillColor = Color3.fromRGB(0, 255, 0)
		highlight.OutlineColor = Color3.fromRGB(0, 200, 0)
	else
		highlight.FillColor = Color3.fromRGB(255, 0, 0)
		highlight.OutlineColor = Color3.fromRGB(200, 0, 0)
	end
end

local RotationAnimator = {}

function RotationAnimator.createRotationTween(part, targetRotation, position)
	local currentCFrame = part.CFrame
	local currentPosition = currentCFrame.Position
	local targetCFrame = CFrame.new(currentPosition) * CFrame.Angles(0, math.rad(targetRotation), 0)

	local tweenInfo = TweenInfo.new(
		Config.tweenDuration,
		Enum.EasingStyle.Quad,
		Enum.EasingDirection.Out
	)

	local tween = TweenService:Create(part, tweenInfo, {CFrame = targetCFrame})
	return tween
end

function RotationAnimator.rotate(state, direction)
	state.targetRotation = (state.targetRotation + (Config.rotationIncrement * direction)) % 360

	if state.silhouette and state.lastPosition then
		if state.rotationTween then
			state.rotationTween:Cancel()
		end

		state.rotationTween = RotationAnimator.createRotationTween(
			state.silhouette,
			state.targetRotation,
			state.lastPosition
		)

		state.rotationTween:Play()
		state.currentRotation = state.targetRotation
	end
end

local TemplateCreator = {}

function TemplateCreator.createTemplate(partType)
	local template
	if partType == "BasePart" then
		template = Instance.new("Part")
	elseif partType == "WedgePart" then
		template = Instance.new("WedgePart")
	elseif partType == "TrussPart" then
		template = Instance.new("TrussPart")
	else
		template = Instance.new("Part")  
	end

	template.Size = Vector3.new(4, 2, 4)
	template.Material = Enum.Material.SmoothPlastic
	template.Color = Color3.fromRGB(100, 150, 200)
	template.Name = "PlacedObject"

	return template
end

local PlacementController = {}

function PlacementController.initialize(state)
	local template = TemplateCreator.createTemplate(state.partType)

	state.silhouette = VisualFeedback.createSilhouette(template)
	state.highlight = VisualFeedback.createHighlight(state.silhouette)
	state.isPlacing = true
	state.currentRotation = 0
	state.targetRotation = 0

	-- update filter after creating silhouette
	Config:updateRaycastFilter()
end

function PlacementController.update(state)
	if not state.isPlacing or not state.silhouette then
		return
	end

	local position, normal, hitPart = RaycastHandler.getValidPlacementPosition()

	if position then
		-- store the raw position for placement
		state.lastPosition = position

		-- offset by half the part height to sit on the surface (for visual only)
		local adjustedPosition = position + Vector3.new(0, state.silhouette.Size.Y / 2, 0)

		local targetCFrame = CFrame.new(adjustedPosition) * CFrame.Angles(0, math.rad(state.currentRotation), 0)

		if not state.rotationTween or state.rotationTween.PlaybackState ~= Enum.PlaybackState.Playing then
			state.silhouette.CFrame = targetCFrame
		end

		state.canPlace = not CollisionDetector.checkOverlap(state.silhouette)
		VisualFeedback.updateHighlightColor(state.highlight, state.canPlace)
	else
		state.canPlace = false
		VisualFeedback.updateHighlightColor(state.highlight, false)
	end
end

function PlacementController.place(state)
	if not state.canPlace then
		return
	end

	if not state.lastPosition then
		return
	end

	local newPart = TemplateCreator.createTemplate(state.partType)

	-- use lastposition (raw) and add the offset for proper placement
	local adjustedPosition = state.lastPosition + Vector3.new(0, newPart.Size.Y / 2, 0)

	newPart.CFrame = CFrame.new(adjustedPosition) * CFrame.Angles(0, math.rad(state.currentRotation), 0)
	newPart.Parent = workspace

	local placeSound = Instance.new("Sound")
	placeSound.SoundId = "rbxassetid://180163738"
	placeSound.Volume = 0.5
	placeSound.Parent = newPart
	placeSound:Play()

	game:GetService("Debris"):AddItem(placeSound, 2)
end

function PlacementController.toggle(state)
	if state.isPlacing then
		state:cleanup()
		state.isPlacing = false
	else
		PlacementController.initialize(state)
	end
end

local InputHandler = {}
InputHandler.debounce = {}

function InputHandler.isDebounced(key)
	return InputHandler.debounce[key] and tick() - InputHandler.debounce[key] < 0.1
end

function InputHandler.setDebounce(key)
	InputHandler.debounce[key] = tick()
end

function InputHandler.handleKeyPress(input, state)
	if input.KeyCode == Config.placementKey and not InputHandler.isDebounced("placement") then
		InputHandler.setDebounce("placement")
		PlacementController.toggle(state)
	elseif input.KeyCode == Config.rotationKey and state.isPlacing and not InputHandler.isDebounced("rotation") then
		InputHandler.setDebounce("rotation")
		RotationAnimator.rotate(state, 1)
	elseif input.KeyCode == Config.partSwitchKeys.BasePart and not InputHandler.isDebounced("partSwitch") then
		InputHandler.setDebounce("partSwitch")
		state.partType = "BasePart"
		if state.isPlacing then
			state:cleanup()
			PlacementController.initialize(state)
		end
	elseif input.KeyCode == Config.partSwitchKeys.WedgePart and not InputHandler.isDebounced("partSwitch") then
		InputHandler.setDebounce("partSwitch")
		state.partType = "WedgePart"
		if state.isPlacing then
			state:cleanup()
			PlacementController.initialize(state)
		end
	elseif input.KeyCode == Config.partSwitchKeys.TrussPart and not InputHandler.isDebounced("partSwitch") then
		InputHandler.setDebounce("partSwitch")
		state.partType = "TrussPart"
		if state.isPlacing then
			state:cleanup()
			PlacementController.initialize(state)
		end
	end
end

function InputHandler.handleMouseClick(state)
	if state.isPlacing and state.canPlace then
		PlacementController.place(state)
	end
end

UserInputService.InputBegan:Connect(function(input, gameProcessed)
	if gameProcessed then 
		return 
	end
	InputHandler.handleKeyPress(input, placementState)
end)

mouse.Button1Down:Connect(function()
	InputHandler.handleMouseClick(placementState)
end)

RunService.RenderStepped:Connect(function()
	PlacementController.update(placementState)
end)

player.CharacterAdded:Connect(function(character)
	Config:updateRaycastFilter()
	placementState:cleanup()
	placementState.isPlacing = false
end)

local PerformanceMonitor = {}
PerformanceMonitor.frameCount = 0
PerformanceMonitor.lastCheck = tick()

function PerformanceMonitor.update()
	PerformanceMonitor.frameCount += 1

	if tick() - PerformanceMonitor.lastCheck >= 1 then
		PerformanceMonitor.frameCount = 0
		PerformanceMonitor.lastCheck = tick()
	end
end

RunService.RenderStepped:Connect(PerformanceMonitor.update)

