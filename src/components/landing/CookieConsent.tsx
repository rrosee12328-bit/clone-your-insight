import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-lg border border-border bg-card shadow-xl backdrop-blur-sm"
        >
          <p className="text-sm text-muted-foreground mb-3">
            We use essential cookies to make this site work. By continuing to use this site,
            you agree to our use of cookies.{" "}
            <a href="#" className="text-primary underline">Learn more</a>.
          </p>
          <div className="flex gap-2">
            <Button onClick={accept} size="sm">Accept</Button>
            <Button onClick={accept} variant="ghost" size="sm">Dismiss</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
