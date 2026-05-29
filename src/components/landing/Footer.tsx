import { Youtube, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter, label: "X / Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@vektiss.com" },
];

const Footer = () => (
  <footer className="border-t border-border py-12 px-4 mt-8">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <div className="text-center sm:text-left">
          <p className="font-bold text-lg">
            Ricky <span className="text-primary">Rose</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Helping people build with wisdom, clarity, and purpose.
          </p>
        </div>

        <div className="flex gap-2">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-lg border border-border bg-card/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ricky Rose. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
