import { WEBINAR_DATE } from "@/lib/constants";
import CountdownTimer from "./CountdownTimer";
import { Button } from "@/components/ui/button";

const StickyNav = () => {
  const scrollToRegistration = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  const formattedDate = WEBINAR_DATE.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <p className="hidden sm:block text-sm font-semibold text-foreground">
          <span className="text-muted-foreground">Date:</span>{" "}
          <span className="font-bold">{formattedDate}</span>
        </p>

        <div className="flex-1 flex justify-center">
          <CountdownTimer compact />
        </div>

        <Button
          onClick={scrollToRegistration}
          className="bg-cta text-cta-foreground hover:bg-cta/90 font-bold text-sm px-5 py-2 shadow-lg whitespace-nowrap"
        >
          Register My Seat Now
        </Button>
      </div>
    </nav>
  );
};

export default StickyNav;
