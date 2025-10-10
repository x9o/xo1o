import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const releasedGames = [
  {
    title: "Steal A Streamer",
    description: "Game released and fully scripted by me.",
    role: "Full Development",
    status: "Released",
    tags: ["Full Stack", "Monetization", "Game Systems"]
  },
  {
    title: "Miami 1986",
    description: "Currently a scripter for the game.",
    role: "Core Scripter",
    status: "Active Development",
    tags: ["Combat", "Systems", "Physics"]
  }
];

const unreleasedGames = [
  {
    title: "Upcoming Brainrot Game",
    description: "Everything seen is scripted by me",
    role: "Full Development",
    tags: ["Brainrot", "Systems", "Monetization"]
  },
  {
    title: "Obscured",
    description: "Fully scripted by me.",
    role: "Full Development",
    tags: ["Complete System", "Advanced Mechanics"]
  },
  {
    title: "Smash Legends",
    description: "Fully scripted by me.",
    role: "Full Development",
    tags: ["Combat", "Character Systems"]
  },
  {
    title: "Don't Touch it!",
    description: "Core systems development",
    role: "Systems Developer",
    tags: ["Physics", "Game Logic"]
  },
  {
    title: "Acid Escape",
    description: "Advanced mechanics implementation",
    role: "Mechanics Developer",
    tags: ["Physics", "Player Systems"]
  }
];

const Projects = () => {
  return (
    <section className="py-20 px-4 bg-muted/30" id="projects">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Games I've <span className="gradient-text">Worked On</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Released titles and upcoming projects
          </p>
        </div>

        <Tabs defaultValue="released" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="released" className="text-base">Released</TabsTrigger>
            <TabsTrigger value="unreleased" className="text-base">In Development</TabsTrigger>
          </TabsList>

          <TabsContent value="released" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {releasedGames.map((game, index) => (
                <Card 
                  key={index}
                  className="relative bg-card border-border hover:border-primary transition-all duration-300 group overflow-hidden"
                >
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {game.title}
                      </CardTitle>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardDescription className="text-base">{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
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
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unreleased" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unreleasedGames.map((game, index) => (
                <Card 
                  key={index}
                  className="relative bg-card border-border hover:border-secondary transition-all duration-300 group overflow-hidden"
                >
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={80}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                      {game.title}
                    </CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
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
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
