import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Rocket } from "lucide-react";
import rickyPhoto from "@/assets/ricky-rose.jpg";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-14 sm:pt-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 sm:gap-12 items-center py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-2 md:order-1"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 aspect-[3/4] max-h-[500px] sm:max-h-[620px] mx-auto max-w-[340px] sm:max-w-none">
            <img
              src={rickyPhoto}
              alt="Ricky Rose"
              className="w-full h-full object-cover object-[center_15%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 md:order-2 text-center md:text-left"
        >
          <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-5">
            Ricky Rose
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
            Build with wisdom.<br />
            Create with clarity.<br />
            <span className="text-primary">Move with purpose.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
            I create content at the intersection of faith, business, AI, mindset, and communication —
            helping people grow spiritually, think clearly, and build with leverage.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-center md:justify-start">
            <Button
              onClick={() => scrollTo("pathways")}
              size="lg"
              className="bg-cta text-cta-foreground hover:bg-cta/90 font-bold shadow-xl shadow-cta/20 hover:scale-[1.02] transition-all"
            >
              <BookOpen className="mr-1" />
              Explore the Bible Side
            </Button>
            <Button
              onClick={() => scrollTo("pathways")}
              size="lg"
              variant="outline"
              className="border-primary/40 hover:bg-primary/10 hover:border-primary font-bold"
            >
              <Rocket className="mr-1" />
              Explore the Builder Side
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
