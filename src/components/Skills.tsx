import { Code2, Database, Zap, Layers, ShoppingCart, Gamepad2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const skills = [
  {
    icon: Gamepad2,
    title: "Game Systems",
    items: ["Full brainrot game systems", "Plot systems", "Physics based mechanics", "Combat systems"]
  },
  {
    icon: ShoppingCart,
    title: "Monetization",
    items: ["Full shop systems", "Monetization optimization", "Complete pet systems", "Inventory management"]
  },
  {
    icon: Layers,
    title: "Architecture",
    items: ["Advanced modular systems", "OOP architecture", "ProfileService integration", "Scalable code structure"]
  },
  {
    icon: Code2,
    title: "Languages",
    items: ["LuaU (Expert)", "Python", "JavaScript", "C++"]
  },
  {
    icon: Zap,
    title: "UI/UX",
    items: ["Smooth UI animations", "Interactive effects", "Modern interfaces", "Responsive design"]
  },
  {
    icon: Database,
    title: "Backend",
    items: ["Data persistence", "Server optimization", "API integration", "Security best practices"]
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
              className="relative bg-card border-border hover:border-primary transition-all duration-300 group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <CardContent className="relative p-6 z-10">
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
