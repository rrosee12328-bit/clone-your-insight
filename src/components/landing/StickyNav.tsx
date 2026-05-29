import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Faith & Wisdom", href: "#faith" },
  { label: "Business & Leverage", href: "#builder" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "YouTube", href: "https://youtube.com", external: true },
  { label: "Work With Me", href: "#work" },
];

const StickyNav = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string, external?: boolean) => {
    setOpen(false);
    if (external) {
      window.open(href, "_blank");
      return;
    }
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button
          onClick={() => handleClick("#top")}
          className="font-bold text-sm sm:text-base tracking-tight hover:text-primary transition-colors"
        >
          Ricky <span className="text-primary">Rose</span>
        </button>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.href, link.external)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => handleClick("#newsletter")}
            className="ml-2 bg-cta text-cta-foreground hover:bg-cta/90 font-semibold"
            size="sm"
          >
            Join the Letter
          </Button>
        </div>

        {/* Mobile button */}
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href, link.external)}
                className="text-left px-2 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleClick("#newsletter")}
              className="mt-2 bg-cta text-cta-foreground hover:bg-cta/90 font-semibold w-full"
              size="sm"
            >
              Join the Letter
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StickyNav;
