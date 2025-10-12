import { SiDiscord, SiRoblox, SiGithub } from "react-icons/si";
import { AnimatedHeader } from "@/components/ui/animated-header";
import DisplayCards from "@/components/ui/display-cards";

const Contact = () => {
  return (
    <section className="py-12 px-4 bg-muted/30" id="contact">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center animate-fade-in">
          <AnimatedHeader
            text="Let's Work Together"
            gradientText="Work Together"
            className="text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-muted-foreground text-lg">Ready to build the next hit Roblox game?</p>
        </div>

        <div className="flex justify-center min-h-[350px] items-center -ml-8">
          <DisplayCards
            cards={[
              {
                icon: <SiDiscord className="size-4 text-primary-foreground" />,
                title: "Discord",
                description: "xo1o",
                date: "Message me",
                iconClassName: "text-primary",
                titleClassName: "text-primary",
                onClick: () => window.open("https://discord.com/users/872347229904588840", "_blank"),
                className:
                  "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
              },
              {
                icon: <SiRoblox className="size-4 text-accent-foreground" />,
                title: "Roblox",
                description: "X0L00X",
                date: "View Profile",
                iconClassName: "text-accent",
                titleClassName: "text-accent",
                onClick: () => window.open("https://www.roblox.com/users/2575395475/profile", "_blank"),
                className:
                  "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
              },
              {
                icon: <SiGithub className="size-4 text-accent-foreground" />,
                title: "GitHub",
                description: "x9o",
                date: "View Profile",
                iconClassName: "text-accent",
                titleClassName: "text-accent",
                onClick: () => window.open("https://github.com/x9o", "_blank"),
                className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
