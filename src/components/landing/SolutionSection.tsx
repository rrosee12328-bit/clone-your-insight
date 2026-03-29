import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SolutionSection = () => (
  <section className="py-20 sm:py-28 px-4 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative max-w-3xl mx-auto text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold mb-6">
        What If You Could Use AI to{" "}
        <span className="text-primary">Multiply What You Already Know?</span>
      </h2>

      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        You don't need to become a tech expert. You don't need to learn to code.
        You just need a proven framework to take your existing expertise and amplify it with AI —
        so you can create more, reach more people, and reclaim your time.
      </p>

      <p className="text-lg text-foreground font-medium">
        That's exactly what you'll learn in this free live webinar. And it's the foundation of our
        upcoming <span className="text-primary font-semibold">AI Challenge</span> — a hands-on
        program where you'll build your AI-powered clone step by step.
      </p>
    </motion.div>
  </section>
);

export default SolutionSection;
