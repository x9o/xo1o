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
        description="Hey! I'm xo1o, a professional Roblox scripter with 3+ years of experience building complex game systems. I specialize in clean Lua code, optimized performance, and scalable architectures. Beyond Roblox, I am also proficient in Python and web development."
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
