import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  children?: { label: string; href: string; external?: boolean }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "Newsletter", href: "#newsletter" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@BibleStudywithRickyRose",
    external: true,
    children: [
      { label: "Bible Study with Ricky Rose", href: "https://www.youtube.com/@BibleStudywithRickyRose", external: true },
      { label: "AI & Business", href: "https://www.youtube.com/@Learningwithrickylrose", external: true },
    ],
  },
  { label: "Work With Me", href: "#work" },
];

const StickyNav = () => {
  const [open, setOpen] = useState(false);
  const [ytOpen, setYtOpen] = useState(false);
  const [mobileYtOpen, setMobileYtOpen] = useState(false);

  const handleClick = (href: string, external?: boolean) => {
    setOpen(false);
    setYtOpen(false);
    setMobileYtOpen(false);
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
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
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setYtOpen(true)}
                onMouseLeave={() => setYtOpen(false)}
              >
                <button
                  onClick={() => setYtOpen((v) => !v)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {ytOpen && (
                  <div className="absolute right-0 top-full pt-2 min-w-[240px]">
                    <div className="rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-lg py-2">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setYtOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                      >
                        Visit YouTube channel
                      </a>
                      <div className="my-1 h-px bg-border/60" />
                      {link.children.map((c) => (
                        <button
                          key={c.label}
                          onClick={() => handleClick(c.href)}
                          className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                key={link.label}
                onClick={() => handleClick(link.href, link.external)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ),
          )}
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
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="flex flex-col">
                  <button
                    onClick={() => setMobileYtOpen((v) => !v)}
                    className="text-left px-2 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-between"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileYtOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileYtOpen && (
                    <div className="pl-4 flex flex-col gap-1 border-l border-border/60 ml-2 mb-1">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="block text-left px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Visit YouTube channel
                      </a>
                      {link.children.map((c) => (
                        <button
                          key={c.label}
                          onClick={() => handleClick(c.href)}
                          className="text-left px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleClick(link.href, link.external)}
                  className="text-left px-2 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              ),
            )}
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
