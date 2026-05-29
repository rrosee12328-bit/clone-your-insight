import { motion } from "framer-motion";

const IntroSection = () => (
  <section className="py-20 sm:py-28 px-4 border-t border-border/50">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center"
    >
      <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-5">
        One belief
      </p>
      <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-foreground/90">
        Everything I create comes from one belief: <span className="text-primary">what God gives you is meant to be stewarded well.</span> Whether I'm teaching through Scripture, breaking down mindset, or helping business owners use AI and content, the goal is the same — clarity, wisdom, and purpose.
      </p>
    </motion.div>
  </section>
);

export default IntroSection;
