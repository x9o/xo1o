import { GalaxyBackground } from "@/components/ui/galaxy-background";
import { MatrixText } from "@/components/ui/matrix-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { memo, useCallback } from "react";

const Hero = memo(() => {
  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Galaxy Background */}
      <GalaxyBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none z-5" />

      <div className="container mx-auto text-center z-10 animate-fade-in">
        <div className="relative inline-block mb-6">
          <MatrixText 
            text="xo1o"
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
            initialDelay={500}
            letterAnimationDuration={300}
            letterInterval={80}
          />
          {/* Animated underline */}
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse" />
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent blur-sm" />
        </div>

        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          Professional Roblox scripter with 3+ years of experience
          crafting games with high retention, smooth mechanics, and monetization systems that convert.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <InteractiveHoverButton
            text="Projects"
            className="w-32 border-primary text-foreground font-semibold [&_span]:pl-2"
            onClick={scrollToProjects}
          />
          <InteractiveHoverButton
            text="Contact"
            className="w-32 border-primary text-foreground font-semibold [&_span]:pl-2"
            onClick={scrollToContact}
          />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
