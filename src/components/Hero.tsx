import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { memo, useCallback } from "react";

const Hero = memo(() => {
  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="hero">
      <HeroGeometric
        badge="Professional Roblox Developer"
        title1="Bringing Your"
        title2="Visions to Life"
        description="I'm xo1o, a professional Roblox scripter who specializes in simple, efficient Lua systems.   I've been making dependable, well-optimized, and engagement-focused games for 3+ years."
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <InteractiveHoverButton
            text="Projects"
            className="w-32 border-white/20 text-white font-semibold [&_span]:pl-2"
            onClick={scrollToProjects}
          />
          <InteractiveHoverButton
            text="Contact"
            className="w-32 border-white/20 text-white font-semibold [&_span]:pl-2"
            onClick={scrollToContact}
          />
        </div>
      </HeroGeometric>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
