import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import { WEBINAR_TITLE, WEBINAR_SUBTITLE, WEBINAR_DATE } from "@/lib/constants";

const Hero = () => {
  const scrollToRegistration = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  const formattedDate = WEBINAR_DATE.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = WEBINAR_DATE.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium"
        >
          Free Live Webinar · {formattedDate}
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
          {WEBINAR_TITLE}
          <span className="block text-primary mt-2">with AI</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          {WEBINAR_SUBTITLE}
        </p>

        <div className="mb-10">
          <p className="text-sm text-muted-foreground mb-3">Webinar starts in:</p>
          <CountdownTimer />
          <p className="text-sm text-muted-foreground mt-3">{formattedTime}</p>
        </div>

        <Button
          onClick={scrollToRegistration}
          size="lg"
          className="text-base px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
        >
          Reserve Your Seat
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
