const Footer = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Clone Yourself. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
        <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
