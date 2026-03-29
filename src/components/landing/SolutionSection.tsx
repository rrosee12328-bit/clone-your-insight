import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const SolutionSection = () => {
  const scrollToRegistration = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
          Full access to my proven Clone Framework will show you how to{" "}
          <span className="text-primary">turn what you already know into content, clients, and cash</span>{" "}
          — without working more hours.
        </h2>

        <Button
          onClick={scrollToRegistration}
          size="lg"
          className="bg-cta text-cta-foreground hover:bg-cta/90 text-lg px-10 py-7 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          Register My Seat Now
        </Button>
        <p className="text-sm text-muted-foreground mt-3">Limited seats available</p>
      </motion.div>
    </section>
  );
};

export default SolutionSection;
