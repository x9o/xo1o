import { Home, Code2, Briefcase, Layers, MessageSquare } from "lucide-react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Systems from "@/components/Systems";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/ui/tubelight-navbar";

const Index = () => {
  const navItems = [
    { name: 'Home', url: '#hero', icon: Home },
    { name: 'Skills', url: '#skills', icon: Code2 },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Systems', url: '#systems', icon: Layers },
    { name: 'Contact', url: '#contact', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen">
      <NavBar items={navItems} />
      <Hero />
      <Skills />
      <Projects />
      <Systems />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
