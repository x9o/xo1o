import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, PawPrint, Zap, Sword } from "lucide-react";
import VideoPlayer from "@/components/ui/video-player";
import { GradientCard } from "@/components/ui/gradient-card";
import { AnimatedHeader } from "@/components/ui/animated-header";

const systems = [
  {
    title: "Exploding Star Skill",
    description: "VFX, SFX and Animations not created by me, remake from heroes battlegrounds",
    icon: Sparkles,
    tags: ["Combat", "VFX", "Skill System"],
    videoUrl: "https://files.catbox.moe/lj1m02.mp4", // Replace with your system demo
  },
  {
    title: "Full Pet System",
    description:
      "Including the inventory, equip functionality and pet hover/follow. Pet models are placeholder freemods",
    icon: PawPrint,
    tags: ["Inventory", "Systems", "Pets"],
    videoUrl:
      "https://cdn.discordapp.com/attachments/1392828475060129995/1426786410039607416/2025-03-25_23-29-19.mp4?ex=68ec7de4&is=68eb2c64&hm=5fa47ae6753e7e300f1f906b1452bd341de933aaf7497a384581865d86f4eb2a&", // Replace with your system demo
  },
  {
    title: "Pet Hatching/Rolling Animation",
    description: "VFX and pet models are placeholder freemods, scripted by me.",
    icon: PawPrint,
    tags: ["Animation", "VFX", "Monetization"],
    videoUrl:
      "https://cdn.discordapp.com/attachments/1392828475060129995/1426787174493192333/2025-03-25_20-02-23.mp4?ex=68ec7e9a&is=68eb2d1a&hm=a22bbf048f1f07646b1e55e86ac3a7370ea2939d1479c478398dd4b92e0fefdf&", // Replace with your system demo
  },
  {
    title: "Lightning Skill with Map Destruction",
    description: "VFX, SFX and Animations not created by me",
    icon: Zap,
    tags: ["Physics", "Combat", "Destruction"],
    videoUrl:
      "https://cdn.discordapp.com/attachments/1392828475060129995/1426787524415586346/2025-04-05_12-10-10.mp4?ex=68ec7eee&is=68eb2d6e&hm=c494c499843cb6433a03bdf8c9e15ab2529836aab33771d55e338aa614386216&", // Replace with your system demo
  },
  {
    title: "Weapon Combat + Movement System",
    description: "Complete combat system with advanced movement mechanics",
    icon: Sword,
    tags: ["Combat", "Movement", "Weapons"],
    videoUrl: "https://youtu.be/vujfuxX9gUY?si=PxKm0iD_CFwhizcP", // Replace with your system demo
  },
];

const Systems = () => {
  return (
    <section className="py-20 px-4" id="systems">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <AnimatedHeader
            text="Featured Systems"
            gradientText="Systems"
            className="text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-muted-foreground text-lg">Custom systems and mechanics I've developed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {systems.map((system, index) => (
            <GradientCard key={index}>
              <Card className="bg-transparent border-0 group overflow-hidden h-full">
                {system.videoUrl && (
                  <div className="w-full">
                    <VideoPlayer src={system.videoUrl} />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <system.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-accent transition-colors mb-2">
                        {system.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{system.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {system.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="border-accent/50 text-accent text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </GradientCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            Note: VFX, SFX, and animations mentioned are from original sources. All scripting and implementation is
            original work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Systems;
