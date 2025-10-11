import { Github, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatedHeader } from "@/components/ui/animated-header";

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Sparkles Background */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto text-center z-10 animate-fade-in">
        <div className="relative inline-block mb-6">
          <AnimatedHeader 
            text="xo1o"
            className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text"
          />
          {/* Animated underline */}
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse" />
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent blur-sm" />
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Professional Roblox scripter with <span className="text-primary font-semibold">3+ years</span> of experience
          crafting games with high retention, smooth mechanics, and monetization systems that convert.
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
      </div>
    </section>
  );
};

export default Hero;
