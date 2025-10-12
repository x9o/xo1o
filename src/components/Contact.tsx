import { MessageSquare, Github } from "lucide-react";
import { AnimatedHeader } from "@/components/ui/animated-header";
import DisplayCards from "@/components/ui/display-cards";

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
          <div className="flex justify-center mb-8 min-h-[500px] items-center">
            <DisplayCards
              cards={[
                {
                  icon: <MessageSquare className="size-4 text-primary-foreground" />,
                  title: "Discord",
                  description: "xo1o",
                  date: "Message me",
                  iconClassName: "text-primary",
                  titleClassName: "text-primary",
                  onClick: () => window.open('https://discord.com', '_blank'),
                  className:
                    "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                },
                {
                  icon: (
                    <svg className="size-4 text-orange-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.169-.448-.169-.617 0l-4.951 4.951c-.169.169-.169.448 0 .617l4.951 4.951c.169.169.448.169.617 0 .169-.169.169-.448 0-.617L12.617 12.5l4.951-4.951c.169-.169.169-.448 0-.617z"/>
                      <path d="M6.432 8.16c-.169.169-.169.448 0 .617L11.383 12.5l-4.951 4.951c-.169.169-.169.448 0 .617.169.169.448.169.617 0l4.951-4.951c.169-.169.169-.448 0-.617L7.049 8.16c-.169-.169-.448-.169-.617 0z"/>
                    </svg>
                  ),
                  title: "Roblox",
                  description: "X0L00X",
                  date: "View Profile",
                  iconClassName: "text-orange-500",
                  titleClassName: "text-orange-500",
                  onClick: () => window.open('https://www.roblox.com/users/2575395475/profile', '_blank'),
                  className:
                    "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                },
                {
                  icon: <Github className="size-4 text-accent-foreground" />,
                  title: "GitHub",
                  description: "x9o",
                  date: "View Profile",
                  iconClassName: "text-accent",
                  titleClassName: "text-accent",
                  onClick: () => window.open('https://github.com/x9o', '_blank'),
                  className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
                },
              ]}
            />
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
