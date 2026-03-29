import { motion } from "framer-motion";

const lies = [
  {
    number: "01",
    title: "You Need to Be Technical to Use AI.",
  },
  {
    number: "02",
    title: "AI Will Replace What You Do.",
  },
  {
    number: "03",
    title: "You Have to Start from Scratch.",
  },
  {
    number: "04",
    title: "More Tools = Better Results.",
  },
  {
    number: "05",
    title: "It's Too Late to Get Started.",
  },
];

const WhatYoullLearn = () => (
  <section className="py-20 sm:py-28 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-5xl font-bold">What You'll Learn In This Webinar:</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lies.map((item, i) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center"
          >
            <p className="text-primary font-bold text-4xl font-mono mb-3">{item.number}</p>
            <h3 className="text-xl font-bold leading-snug">{item.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatYoullLearn;
