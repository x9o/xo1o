import { HeroSection } from "@/components/ui/galaxy-interactive-hero-section"
import React from 'react'; // Import React for JSX

// Define the height of the navbar for spacing

export function HeroSectionBasic() {
  return (
    <main className="bg-black relative h-screen w-screen">
      <HeroSection />
    </main>
  );
}
