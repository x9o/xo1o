import { Github, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto text-center z-10 animate-fade-in">
        <div className="mb-6 animate-float">
          <h2 className="text-lg md:text-xl text-muted-foreground mb-2">
            X0L00X <span className="text-primary">aka</span> iaintgivinuthechance
          </h2>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text">
          @xo1o
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Professional Roblox scripter with <span className="text-primary font-semibold">3+ years</span> of experience crafting games with high retention, smooth mechanics, and monetization systems that convert.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg card-glow"
          >
            <Github className="mr-2 h-5 w-5" />
            View Projects
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg bg-card border border-border backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-primary mb-2">High Session Time</h3>
            <p className="text-muted-foreground">Engaging gameplay loops</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-secondary mb-2">D1 & D7 Retention</h3>
            <p className="text-muted-foreground">Players keep coming back</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-accent mb-2">High Conversion</h3>
            <p className="text-muted-foreground">Monetization that works</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
