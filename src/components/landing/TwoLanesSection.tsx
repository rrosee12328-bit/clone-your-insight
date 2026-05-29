import { motion } from "framer-motion";

const TwoLanesSection = () => (
  <section className="py-20 sm:py-28 px-4 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative max-w-4xl mx-auto text-center"
    >
      <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs mb-4">
        The foundation
      </p>
      <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">
        Two lanes. <span className="text-primary">One foundation.</span>
      </h2>
      <p className="text-xl sm:text-2xl font-medium text-foreground/90 mb-6 max-w-3xl mx-auto">
        Wisdom for the heart. <span className="text-primary">AI and leverage for the work.</span>
      </p>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        Faith shapes how I see life. Wisdom shapes how I think. AI, content, and business
        are simply tools to help people multiply what they've been trusted with. Two lanes,
        one worldview — without forcing them into the same category.
      </p>
    </motion.div>
  </section>
);

export default TwoLanesSection;
