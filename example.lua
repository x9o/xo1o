--!strict
--[[
Advanced Placement System by xo1o
]]

-- service dependencies for core roblox functionality
local Players = game:GetService("Players")
local ContextActionService = game:GetService("ContextActionService")
local UserInputService = game:GetService("UserInputService")
-- rendersteppped gives us per-frame updates for smooth ghost positioning
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
-- physicsservice lets us create collision groups for the ghost part
local PhysicsService = game:GetService("PhysicsService")
local Workspace = game:GetService("Workspace")

-- loading external open-source pattern: janitor for automatic cleanup
local placementFolder = ReplicatedStorage:WaitForChild("Placement")
local modulesFolder = placementFolder:WaitForChild("Modules")
local Janitor = require(modulesFolder:WaitForChild("Janitor"))
-- shared logic between client and server for validation consistency
local PlacementShared = require(modulesFolder:WaitForChild("PlacementShared"))
local remotesFolder = placementFolder:WaitForChild("Remotes")
-- remote event for client-server communication
local placeRequest = remotesFolder:WaitForChild("PlaceRequest")

-- local player reference for character tracking
local player = Players.LocalPlayer
local camera = Workspace.CurrentCamera

-- color constants for visual feedback system
local GREEN = Color3.fromRGB(111, 255, 144)
local RED = Color3.fromRGB(255, 92, 92)
-- pulling config from shared module for consistency
local GRID_STEP = PlacementShared.Constants.Grid.Step
local ROT_STEP = PlacementShared.Constants.RotationIncrement.Step

-- mapping actions to input types for contextactionservice binding
local ACTION_INPUTS = {
	Place_Toggle = {Enum.KeyCode.E},
	Place_Rotate = {Enum.KeyCode.R},
	-- supporting both mouse and touch for cross-platform compatibility
	Place_Click = {Enum.UserInputType.MouseButton1, Enum.UserInputType.Touch},
	Place_NextPart = {Enum.KeyCode.RightBracket},
	Place_PrevPart = {Enum.KeyCode.LeftBracket},
}

-- object-oriented design pattern: class definition with metatable
local PlacementSession = {}
PlacementSession.__index = PlacementSession

-- strict type annotation for luau type checking
type PlacementSession = {
	player: Player,
	remote: RemoteEvent,
	gridSize: number,
	rotationInc: number,
	snapEnabled: boolean,
	partKind: string,
	currentYaw: number,
	active: boolean,
	canPlace: boolean,
	ghost: BasePart?,
	ghostHighlight: Highlight?,
	ghostTargetCF: CFrame?,
	rayParams: RaycastParams,
	overlapParams: OverlapParams,
	janitor: any,
	hudJanitor: any,
	hud: ScreenGui?,
}

-- helper function for ui formatting
local function formatGrid(value: number): string
	return string.format("%.2f", value)
end

-- helper function for degree symbol display
local function formatRotation(value: number): string
	return string.format("%d°", value)
end

-- constructor pattern with initialization chain
function PlacementSession.new(remote: RemoteEvent): PlacementSession
	-- metatable-based inheritance for oop
	local self = setmetatable({}, PlacementSession)
	self.player = player
	self.remote = remote
	-- loading default values from shared config
	self.gridSize = PlacementShared.Constants.Grid.Default
	self.rotationInc = PlacementShared.Constants.RotationIncrement.Default
	self.snapEnabled = true
	-- part type system with cycling support
	self.partKind = PlacementShared.PartOrder[1]
	self.currentYaw = 0
	-- state flags for placement mode
	self.active = false
	self.canPlace = false
	-- ghost is the preview part shown to the player
	self.ghost = nil
	self.ghostHighlight = nil
	self.ghostTargetCF = nil
	-- caching raycast and overlap params for performance
	self.rayParams = PlacementShared.CreateRaycastParams({})
	self.overlapParams = PlacementShared.CreateOverlapParams({}, "Default")
	-- janitor pattern: automatic cleanup on destroy
	self.janitor = Janitor.new()
	self.hudJanitor = Janitor.new()
	self.hud = nil

	-- initialization chain calling setup methods
	self:bindActions()
	self:connectRenderStep()
	self:listenForCharacter()
	self:listenForCamera()
	-- filter setup to ignore player and ghost in raycasts
	self:updateIgnoreLists()
	return self
end

-- listening for character respawn to clean up and reset
function PlacementSession:listenForCharacter()
	local connection = self.player.CharacterAdded:Connect(function()
		self:updateIgnoreLists()
		self:Stop()
	end)
	-- janitor tracks connection for automatic cleanup
	self.janitor:Add(connection, "Disconnect")
end

-- camera change handler for workspace switching
function PlacementSession:listenForCamera()
	local connection = Workspace:GetPropertyChangedSignal("CurrentCamera"):Connect(function()
		camera = Workspace.CurrentCamera
		self:syncGhostParent()
	end)
	self.janitor:Add(connection, "Disconnect")
end

-- renderstep gives us frame-by-frame updates for smooth ghost movement
function PlacementSession:connectRenderStep()
	self.janitor:Add(RunService.RenderStepped:Connect(function(dt)
		self:Update(dt)
	end), "Disconnect")
end

-- critical: keeps raycast from hitting the ghost itself or the player
function PlacementSession:updateIgnoreLists()
	local ignore = {}
	local character = self.player.Character
	if character then
		table.insert(ignore, character)
	end
	-- ghost must be in ignore list to prevent self-collision
	if self.ghost then
		table.insert(ignore, self.ghost)
	end
	self.rayParams.FilterDescendantsInstances = ignore
	self.overlapParams.FilterDescendantsInstances = ignore
end

-- make sure ghost stays in workspace even if camera changes
function PlacementSession:syncGhostParent()
	if self.ghost then
		self.ghost.Parent = Workspace
	end
end

-- factory method for creating the preview ghost part
function PlacementSession:createGhost()
	local definition = PlacementShared.GetDefinition(self.partKind)
	-- clean up old ghost before creating new one
	if self.ghost then
		self.ghost:Destroy()
		self.ghost = nil
		self.ghostHighlight = nil
	end

	-- instantiating part based on definition from shared module
	local part = Instance.new(definition.ClassName)
	part.Name = "PlacementGhost"
	part.Size = definition.Size
	part.Anchored = true
	-- collision disabled so ghost doesn't interact with physics
	part.CanCollide = false
	part.CanTouch = false
	part.CanQuery = false
	part.CastShadow = false
	part.Color = definition.Color
	part.Material = definition.Material
	-- semi-transparent for preview effect
	part.Transparency = 0.5

	-- highlight instance for visual feedback (green/red)
	local highlight = Instance.new("Highlight")
	highlight.Name = "PlacementGhostHighlight"
	highlight.FillTransparency = 0.4
	highlight.OutlineTransparency = 0
	highlight.FillColor = GREEN
	highlight.OutlineColor = GREEN
	highlight.Adornee = part
	highlight.Parent = part

	-- physics collision group to prevent ghost from interfering
	PhysicsService:SetPartCollisionGroup(part, PlacementShared.CollisionGroupName)
	self.ghost = part
	self.ghostHighlight = highlight
	self:syncGhostParent()
	-- update filters after ghost creation
	self:updateIgnoreLists()
end

-- contextactionservice provides mobile-compatible input handling
function PlacementSession:bindActions()
	local function bind(name: string, handler)
		local inputs = ACTION_INPUTS[name]
		-- bindaction handles priority and input sinking automatically
		ContextActionService:BindAction(name, handler, false, table.unpack(inputs))
		self.janitor:Add(function()
			ContextActionService:UnbindAction(name)
		end)
	end

	-- toggle placement mode on/off
	bind("Place_Toggle", function(_, state)
		if state ~= Enum.UserInputState.Begin then
			return Enum.ContextActionResult.Pass
		end
		self:ToggleActive()
		return Enum.ContextActionResult.Sink
	end)

	-- rotate ghost by configured increment
	bind("Place_Rotate", function(_, state)
		if state ~= Enum.UserInputState.Begin then
			return Enum.ContextActionResult.Pass
		end
		self:Rotate(1)
		return Enum.ContextActionResult.Sink
	end)

	-- place part at current ghost position
	bind("Place_Click", function(_, state)
		if state ~= Enum.UserInputState.Begin then
			return Enum.ContextActionResult.Pass
		end
		if not self.active then
			return Enum.ContextActionResult.Pass
		end
		self:Place()
		return Enum.ContextActionResult.Sink
	end)

	-- cycle through part types
	bind("Place_NextPart", function(_, state)
		if state ~= Enum.UserInputState.Begin then
			return Enum.ContextActionResult.Pass
		end
		self:SetPartByDelta(1)
		return Enum.ContextActionResult.Sink
	end)

	bind("Place_PrevPart", function(_, state)
		if state ~= Enum.UserInputState.Begin then
			return Enum.ContextActionResult.Pass
		end
		self:SetPartByDelta(-1)
		return Enum.ContextActionResult.Sink
	end)

	ContextActionService:SetTitle("Place_Toggle", "Toggle Placement")
end

-- state machine toggle method
function PlacementSession:ToggleActive()
	if self.active then
		self:Stop()
	else
		self:Start()
	end
end

-- enters placement mode and creates ghost
function PlacementSession:Start()
	if self.active then
		return
	end
	self.active = true
	self:createGhost()
	self:updateHud()
end

-- exits placement mode and cleans up ghost
function PlacementSession:Stop()
	if not self.active then
		return
	end
	self.active = false
	self.canPlace = false
	-- destroying ghost when not in use saves memory
	if self.ghost then
		self.ghost:Destroy()
		self.ghost = nil
		self.ghostHighlight = nil
	end
	self:updateIgnoreLists()
	self:updateHud()
end

-- rotation system using modulo for wrapping
function PlacementSession:Rotate(direction: number)
	self.currentYaw = (self.currentYaw + direction * self.rotationInc) % 360
	self:updateHud()
end

-- clamping grid size within valid range
function PlacementSession:SetGridSize(value: number)
	local newSize = PlacementShared.ClampGridSize(value)
	-- epsilon check prevents unnecessary updates
	if math.abs(newSize - self.gridSize) < 1e-3 then
		return
	end
	self.gridSize = newSize
	self:updateHud()
end

-- grid adjustment with step increments
function PlacementSession:AdjustGrid(delta: number)
	self:SetGridSize(self.gridSize + delta)
end

-- rotation increment adjustment (5° to 90°)
function PlacementSession:SetRotationIncrement(value: number)
	local newInc = PlacementShared.ClampRotationIncrement(value)
	if math.abs(newInc - self.rotationInc) < 1e-3 then
		return
	end
	self.rotationInc = newInc
	self:updateHud()
end

function PlacementSession:AdjustRotation(delta: number)
	self:SetRotationIncrement(self.rotationInc + delta)
end

-- snap toggle for free placement vs grid-locked
function PlacementSession:ToggleSnap()
	self.snapEnabled = not self.snapEnabled
	self:updateHud()
end

-- part type switching with validation
function PlacementSession:SetPart(kind: string)
	if not PlacementShared.PartDefinitions[kind] then
		return
	end
	self.partKind = kind
	-- recreate ghost when part type changes
	if self.active then
		self:createGhost()
	end
	self:updateHud()
end

-- cycling through part types with wrapping
function PlacementSession:SetPartByDelta(delta: number)
	local nextKind = PlacementShared.GetNextPartKind(self.partKind, delta)
	self:SetPart(nextKind)
end

-- hud system for displaying placement state and controls
function PlacementSession:AttachHud(screenGui: ScreenGui)
	self.hud = screenGui
	screenGui.ResetOnSpawn = false
	screenGui.Enabled = true
	self.hudJanitor:Cleanup()

	local controls = screenGui:WaitForChild("Controls")
	-- helper to connect button callbacks with janitor cleanup
	local function connect(buttonName: string, callback)
		local button = controls:FindFirstChild(buttonName, true)
		if button and button:IsA("GuiButton") then
			self.hudJanitor:Add(button.MouseButton1Click:Connect(callback), "Disconnect")
		end
	end

	-- binding ui buttons to adjustment functions
	connect("GridMinus", function()
		self:AdjustGrid(-GRID_STEP)
	end)
	connect("GridPlus", function()
		self:AdjustGrid(GRID_STEP)
	end)
	connect("RotMinus", function()
		self:AdjustRotation(-ROT_STEP)
	end)
	connect("RotPlus", function()
		self:AdjustRotation(ROT_STEP)
	end)
	connect("SnapToggle", function()
		self:ToggleSnap()
	end)

	-- dropdown menu system for part selection
	local partToggle = controls:FindFirstChild("PartValue")
	local dropdown = controls:FindFirstChild("PartDropdown")
	if partToggle and partToggle:IsA("GuiButton") and dropdown and dropdown:IsA("Frame") then
		self.hudJanitor:Add(partToggle.MouseButton1Click:Connect(function()
			dropdown.Visible = not dropdown.Visible
		end), "Disconnect")
		-- dynamically connect all dropdown options
		for _, child in ipairs(dropdown:GetChildren()) do
			if child:IsA("TextButton") then
				self.hudJanitor:Add(child.MouseButton1Click:Connect(function()
					dropdown.Visible = false
					self:SetPart(child.Name)
				end), "Disconnect")
			end
		end
	end

	self.janitor:Add(self.hudJanitor, "Cleanup")
	self:updateHud()
end

-- syncing ui text with current state
function PlacementSession:updateHud()
	local screenGui = self.hud
	if not screenGui then
		return
	end
	local controls = screenGui:FindFirstChild("Controls")
	if not controls then
		return
	end

	-- updating all label text to reflect current settings
	local gridLabel = controls:FindFirstChild("GridValue")
	local rotLabel = controls:FindFirstChild("RotValue")
	local snapLabel = controls:FindFirstChild("SnapStatus")
	local modeLabel = controls:FindFirstChild("ModeStatus")
	local partValue = controls:FindFirstChild("PartValueLabel")
	if gridLabel and gridLabel:IsA("TextLabel") then
		gridLabel.Text = "Grid: " .. formatGrid(self.gridSize)
	end
	if rotLabel and rotLabel:IsA("TextLabel") then
		rotLabel.Text = "Rotation: " .. formatRotation(self.rotationInc)
	end
	if snapLabel and snapLabel:IsA("TextLabel") then
		snapLabel.Text = self.snapEnabled and "Snap: On" or "Snap: Off"
	end
	if modeLabel and modeLabel:IsA("TextLabel") then
		modeLabel.Text = self.active and "Placement: Enabled" or "Placement: Disabled"
	end
	if partValue and partValue:IsA("TextLabel") then
		partValue.Text = "Part: " .. self.partKind
	end
end

-- visual feedback system: green = can place, red = blocked
function PlacementSession:updateGhostVisual(canPlace: boolean)
	if not self.ghostHighlight then
		return
	end
	self.ghostHighlight.FillColor = canPlace and GREEN or RED
	self.ghostHighlight.OutlineColor = canPlace and GREEN or RED
end

-- main update loop: runs every frame while placement is active
function PlacementSession:Update(dt: number)
	if not self.active or not self.ghost then
		return
	end

	local cam = Workspace.CurrentCamera
	if not cam then
		return
	end

	-- update ignore lists every frame to catch character changes
	self:updateIgnoreLists()

	-- get mouse position for raycasting from camera
	local mousePosition = UserInputService:GetMouseLocation()
	local viewportRay = cam:ViewportPointToRay(mousePosition.X, mousePosition.Y)
	local definition = PlacementShared.GetDefinition(self.partKind)
	-- raycast from camera through mouse position into world
	local hitResult = PlacementShared.Raycast(viewportRay.Origin, viewportRay.Direction * 500, self.rayParams)

	local canPlace = false

	if hitResult then
		-- compute placement using object-space snapping from shared module
		local placementCF = PlacementShared.ComputePlacementData(hitResult, self.gridSize, math.rad(self.currentYaw), definition, self.snapEnabled)
		self.ghostTargetCF = placementCF

		if placementCF then
			-- collision check using getpartboundsinbox for accuracy
			local _, isClear = PlacementShared.CheckCollision(placementCF, definition, self.overlapParams)
			-- distance check prevents placing too far from player
			local inRange = PlacementShared.IsWithinDistance(cam.CFrame.Position, placementCF, PlacementShared.Constants.MaxDistance)
			canPlace = isClear and inRange

			-- direct cframe assignment for instant response (no smoothing)
			self.ghost.CFrame = placementCF
		end
	end

	self.canPlace = canPlace
	self:updateGhostVisual(canPlace)
end

-- client-side placement: sends request to server for validation
function PlacementSession:Place()
	if not (self.active and self.canPlace and self.ghostTargetCF) then
		return
	end

	local currentCamera = Workspace.CurrentCamera
	local cameraCFrame = currentCamera and currentCamera.CFrame or CFrame.new()

	-- sending placement data to server for authority validation
	self.remote:FireServer({
		PartKind = self.partKind,
		DesiredCFrame = self.ghostTargetCF,
		GridSize = self.gridSize,
		RotationIncrement = self.rotationInc,
		SnapEnabled = self.snapEnabled,
		Yaw = math.rad(self.currentYaw),
		CameraCFrame = cameraCFrame,
	})
end

-- janitor cleanup pattern to make sure no memory leaks
function PlacementSession:Destroy()
	self.janitor:Cleanup()
	self.hudJanitor:Cleanup()
	if self.ghost then
		self.ghost:Destroy()
	end
end

-- initialization: create session and attach hud
local session = PlacementSession.new(placeRequest)
local playerGui = player:WaitForChild("PlayerGui")
local hud = playerGui:WaitForChild("PlacementHUD")
session:AttachHud(hud)
