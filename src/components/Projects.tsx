import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import VideoPlayer from "@/components/ui/video-player";
import { GradientCard } from "@/components/ui/gradient-card";
import { AnimatedHeader } from "@/components/ui/animated-header";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, memo, useCallback } from "react";

const releasedGames = [
  {
    title: "Steal A Streamer",
    description: "Game released and fully scripted by me.",
    role: "Full Development",
    status: "Released",
    tags: ["Full Stack", "Monetization", "Game Systems"],
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop&crop=center&auto=format&q=80" // Roblox game screenshot
  },
  {
    title: "Miami 1986",
    description: "Currently a scripter for the game.",
    role: "Core Scripter",
    status: "Active Development",
    tags: ["Combat", "Systems", "Physics"],
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop&crop=center&auto=format&q=80" // Gaming screenshot
  }
];

const unreleasedGames = [
  {
    title: "Upcoming Brainrot Game",
    description: "Everything seen is scripted by me",
    role: "Full Development",
    tags: ["Brainrot", "Systems", "Monetization"],
    videoUrl: "https://youtu.be/JkuypVC5okQ" // Replace with your game video
  },
  {
    title: "Obscured",
    description: "Fully scripted by me.",
    role: "Full Development",
    tags: ["Complete System", "Advanced Mechanics"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your game video
  },
  {
    title: "Smash Legends",
    description: "Fully scripted by me.",
    role: "Full Development",
    tags: ["Combat", "Character Systems"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your game video
  },
  {
    title: "Don't Touch it!",
    description: "Core systems development",
    role: "Systems Developer",
    tags: ["Physics", "Game Logic"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your game video
  },
  {
    title: "Acid Escape",
    description: "Advanced mechanics implementation",
    role: "Mechanics Developer",
    tags: ["Physics", "Player Systems"],
    videoUrl: "https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" // Replace with your game video
  }
];

const TubelightTabs = memo(({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const tabs = [
    { value: "released", label: "Released" },
    { value: "unreleased", label: "In Development" }
  ];

  return (
    <div className="flex items-center gap-2 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg w-fit mx-auto mb-12">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "relative cursor-pointer text-sm font-semibold px-8 py-3 rounded-full transition-colors min-w-[140px]",
              "text-foreground/80 hover:text-primary",
              isActive && "bg-muted text-primary",
            )}
          >
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="projects-lamp"
                className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                  <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                  <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                  <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                </div>
              </motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
});

TubelightTabs.displayName = 'TubelightTabs';

const Projects = memo(() => {
  const [activeTab, setActiveTab] = useState("released");
  
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <section className="py-20 px-4 bg-muted/30" id="projects">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <AnimatedHeader 
            text="Games I've Worked On"
            gradientText="Worked On"
            className="text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-muted-foreground text-lg">
            Released titles and upcoming projects
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <TubelightTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {activeTab === "released" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {releasedGames.map((game, index) => (
                  <GradientCard key={index}>
                    <Card 
                      className="bg-transparent border-0 group overflow-hidden h-full"
                    >
                      {game.imageUrl && (
                        <div className="w-full aspect-video overflow-hidden rounded-t-lg">
                          <img 
                            src={game.imageUrl} 
                            alt={`${game.title} screenshot`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {game.title}
                          </CardTitle>
                          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <CardDescription className="text-base">{game.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-primary text-primary">
                              {game.role}
                            </Badge>
                            <Badge variant="secondary">
                              {game.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {game.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </GradientCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === "unreleased" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unreleasedGames.map((game, index) => (
                  <GradientCard key={index}>
                    <Card 
                      className="bg-transparent border-0 group overflow-hidden h-full"
                    >
                      {game.videoUrl && (
                        <div className="w-full">
                          <VideoPlayer src={game.videoUrl} />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                          {game.title}
                        </CardTitle>
                        <CardDescription>{game.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Badge variant="outline" className="border-secondary text-secondary">
                            {game.role}
                          </Badge>
                          <div className="flex flex-wrap gap-2">
                            {game.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </GradientCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
