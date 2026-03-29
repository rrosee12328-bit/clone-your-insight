import { motion } from "framer-motion";
import { Brain, RefreshCw, HelpCircle } from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "AI Overwhelm",
    description: "New tools launch every day. You feel like you're already behind before you even start.",
  },
  {
    icon: RefreshCw,
    title: "Constant Change",
    description: "Just when you learn one tool, everything changes. The landscape never stops shifting.",
  },
  {
    icon: HelpCircle,
    title: "No Clear Starting Point",
    description: "You know AI is important, but you don't know which tools actually matter for YOUR work.",
  },
];

const ProblemSection = () => (
  <section className="py-20 sm:py-28 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Sound Familiar?</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          You're not alone. These are the exact challenges holding back thousands of professionals.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((problem, i) => (
          <motion.div
            key={problem.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
              <problem.icon className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
