import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import { WEBINAR_TITLE, WEBINAR_SUBTITLE, WEBINAR_DATE } from "@/lib/constants";
import rickyPhoto from "@/assets/ricky-rose.jpg";

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

  const formattedTime = "7:00 PM CST";

  return (
    <section className="relative min-h-screen flex items-center pt-14 sm:pt-16 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-6 sm:gap-8 items-center py-8 sm:py-12">
        {/* Photo side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-2 md:order-1"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 aspect-[3/4] max-h-[400px] sm:max-h-[600px] mx-auto max-w-[320px] sm:max-w-none">
            <img
              src={rickyPhoto}
              alt="Ricky Rose, CEO of Vektiss"
              className="w-full h-full object-cover object-[center_15%]"
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 md:order-2 text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cta font-bold uppercase tracking-wider text-xs sm:text-sm mb-3 sm:mb-4"
          >
            Live Masterclass Reveals
          </motion.p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-3 sm:mb-4">
            CLONE YOURSELF
          </h1>

          <p className="text-lg sm:text-2xl md:text-3xl font-bold text-primary leading-snug mb-4 sm:mb-6 max-w-xl mx-auto md:mx-0">
            5 Costly AI Mistakes That Are Costing You Time, Money, and Opportunity
          </p>

          <p className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 mb-6 sm:mb-8 leading-relaxed">
            {WEBINAR_SUBTITLE}
          </p>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-1.5 sm:gap-2 text-sm text-muted-foreground mb-3 sm:mb-4">
            <span className="flex items-center gap-1.5">
              <span className="text-cta">📅</span>
              <span className="font-semibold text-foreground text-xs sm:text-sm">{formattedDate}</span>
            </span>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-1.5">
              <span className="text-cta">🕐</span>
              <span className="font-semibold text-foreground text-xs sm:text-sm">{formattedTime}</span>
            </span>
          </div>

          <div className="mb-6 sm:mb-8">
            <CountdownTimer />
          </div>

          <Button
            onClick={scrollToRegistration}
            size="lg"
            className="bg-cta text-cta-foreground hover:bg-cta/90 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 font-bold shadow-xl shadow-cta/20 transition-all hover:shadow-cta/30 hover:scale-[1.02] w-full sm:w-auto"
          >
            Register My Seat Now
          </Button>
          <p className="text-sm text-muted-foreground mt-3 md:text-left text-center">
            Limited seats available
          </p>

          <p className="text-sm text-muted-foreground mt-4 sm:mt-6">
            Presented by <span className="text-cta font-semibold">Ricky Rose</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;