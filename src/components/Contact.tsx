import { Button } from "@/components/ui/button";
import { MessageSquare, Github } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Contact = () => {
  return (
    <section className="py-20 px-4 bg-muted/30" id="contact">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to build the next hit Roblox game?
          </p>
        </div>

        <div className="relative bg-card border border-border rounded-lg p-8 md:p-12 overflow-hidden">
          <GlowingEffect
            spread={50}
            glow={true}
            disabled={false}
            proximity={100}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 rounded-lg bg-muted/50 border border-border">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Discord</h3>
              <p className="text-muted-foreground mb-4">xo1o</p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={() => window.open('https://discord.com', '_blank')}
              >
                Message on Discord
              </Button>
            </div>

            <div className="text-center p-6 rounded-lg bg-muted/50 border border-border">
              <Github className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Roblox</h3>
              <p className="text-muted-foreground mb-4">X0L00X</p>
              <Button 
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold"
                onClick={() => window.open('https://www.roblox.com', '_blank')}
              >
                View Roblox Profile
              </Button>
            </div>
          </div>

          <div className="relative z-10 text-center pt-6 border-t border-border">
            <p className="text-muted-foreground mb-2">Also find me on X (Twitter)</p>
            <a 
              href="https://x.com/xo1o" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              @xo1o
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
