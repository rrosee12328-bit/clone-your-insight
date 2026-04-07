import { Button } from "@/components/ui/button";

const StickyNav = () => {
  const scrollToRegistration = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2">
        {/* Desktop */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-foreground">Clone Yourself with AI</p>
          <Button
            onClick={scrollToRegistration}
            className="bg-cta text-cta-foreground hover:bg-cta/90 font-bold text-sm px-5 py-2 shadow-lg whitespace-nowrap shrink-0"
          >
            Join the Waitlist
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden items-center justify-between gap-2">
          <p className="text-xs font-bold text-foreground">Clone Yourself with AI</p>
          <Button
            onClick={scrollToRegistration}
            className="bg-cta text-cta-foreground hover:bg-cta/90 font-bold text-xs px-4 py-1.5 shadow-lg whitespace-nowrap"
            size="sm"
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav;
