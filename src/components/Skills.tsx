import { Code2, Database, Zap, Layers, ShoppingCart, Gamepad2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import VideoPlayer from "@/components/ui/video-player";

const skills = [
  {
    icon: Gamepad2,
    title: "Game Systems",
    items: ["Full brainrot game systems", "Plot systems", "Physics based mechanics", "Combat systems"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your game systems demo
  },
  {
    icon: ShoppingCart,
    title: "Monetization",
    items: ["Full shop systems", "Monetization optimization", "Complete pet systems", "Inventory management"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your monetization demo
  },
  {
    icon: Layers,
    title: "Architecture",
    items: ["Advanced modular systems", "OOP architecture", "ProfileService integration", "Scalable code structure"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your architecture demo
  },
  {
    icon: Code2,
    title: "Languages",
    items: ["LuaU (Expert)", "Python", "JavaScript", "C++"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your coding demo
  },
  {
    icon: Zap,
    title: "UI/UX",
    items: ["Smooth UI animations", "Interactive effects", "Modern interfaces", "Responsive design"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your UI/UX demo
  },
  {
    icon: Database,
    title: "Backend",
    items: ["Data persistence", "Server optimization", "API integration", "Security best practices"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your backend demo
  }
];

const Skills = () => {
  return (
    <section className="py-20 px-4" id="skills">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What I Can <span className="gradient-text">Do</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Full-stack Roblox development expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <Card 
              key={index}
              className="bg-card border-border hover:border-primary transition-all duration-300 card-glow group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                {skill.videoUrl && (
                  <div className="mb-4 -mx-6 -mt-6">
                    <VideoPlayer src={skill.videoUrl} />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-foreground">{skill.title}</h3>
                    <ul className="space-y-2">
                      {skill.items.map((item, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex items-start">
                          <span className="text-primary mr-2">▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
