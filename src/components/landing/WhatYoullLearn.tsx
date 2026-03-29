import { motion } from "framer-motion";

const mistakes = [
  {
    number: "01",
    title: "Thinking you need to be \"tech-savvy\" to build real AI systems.",
  },
  {
    number: "02",
    title: "Believing you don't have enough time to learn AI. (You don't have time not to.)",
  },
  {
    number: "03",
    title: "Letting AI make you sound generic, robotic, and nothing like yourself.",
  },
  {
    number: "04",
    title: "Waiting until you're \"ready\" or have \"more money\" to start building.",
  },
  {
    number: "05",
    title: "Using ChatGPT without a system and wondering why it is not working.",
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
        <h2 className="text-3xl sm:text-5xl font-bold">What You'll Learn In This Masterclass:</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mistakes.map((item, i) => (
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
