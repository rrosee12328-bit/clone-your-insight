import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CTABreakProps {
  heading?: string;
  subtext?: string;
}

const CTABreak = ({ heading = "Reserve Your Seat Now", subtext = "Limited seats available" }: CTABreakProps) => {
  const scrollToRegistration = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="py-12 px-4 text-center"
    >
      <h3 className="text-2xl sm:text-3xl font-bold mb-4">{heading}</h3>
      <Button
        onClick={scrollToRegistration}
        size="lg"
        className="bg-cta text-cta-foreground hover:bg-cta/90 text-base px-8 py-6 font-bold shadow-lg shadow-cta/20 hover:scale-[1.02] transition-all"
      >
        Register My Seat Now
      </Button>
      <p className="text-sm text-muted-foreground mt-3">{subtext}</p>
    </motion.section>
  );
};

export default CTABreak;
