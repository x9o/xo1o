import { Button } from "@/components/ui/button";
import { MessageSquare, Github } from "lucide-react";
import { AnimatedHeader } from "@/components/ui/animated-header";

const Contact = () => {
  return (
    <section className="py-20 px-4 bg-muted/30" id="contact">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <AnimatedHeader 
            text="Let's Work Together"
            gradientText="Work Together"
            className="text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-muted-foreground text-lg">
            Ready to build the next hit Roblox game?
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 md:p-12 card-glow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Discord Section */}
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

            {/* Roblox Section */}
            <div className="text-center p-6 rounded-lg bg-muted/50 border border-border">
              <svg className="h-12 w-12 text-orange-500 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.169-.448-.169-.617 0l-4.951 4.951c-.169.169-.169.448 0 .617l4.951 4.951c.169.169.448.169.617 0 .169-.169.169-.448 0-.617L12.617 12.5l4.951-4.951c.169-.169.169-.448 0-.617z"/>
                <path d="M6.432 8.16c-.169.169-.169.448 0 .617L11.383 12.5l-4.951 4.951c-.169.169-.169.448 0 .617.169.169.448.169.617 0l4.951-4.951c.169-.169.169-.448 0-.617L7.049 8.16c-.169-.169-.448-.169-.617 0z"/>
              </svg>
              <h3 className="text-xl font-bold mb-2">Roblox</h3>
              <p className="text-muted-foreground mb-4">X0L00X</p>
              <Button 
                variant="outline"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold"
                onClick={() => window.open('https://www.roblox.com/users/2575395475/profile', '_blank')}
              >
                View Roblox Profile
              </Button>
            </div>

            {/* GitHub Section */}
            <div className="text-center p-6 rounded-lg bg-muted/50 border border-border">
              <Github className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="text-muted-foreground mb-4">x9o</p>
              <Button 
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold"
                onClick={() => window.open('https://github.com/x9o', '_blank')}
              >
                View GitHub Profile
              </Button>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-border">
            <p className="text-muted-foreground mb-2">Also find me on X (Twitter)</p>
            <a 
              href="https://x.com/xoloware" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              @xoloware
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
