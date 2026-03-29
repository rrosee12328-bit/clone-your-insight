import { motion } from "framer-motion";
import { Target, Layers, Zap, Rocket } from "lucide-react";

const takeaways = [
  {
    icon: Target,
    title: "The Clone Framework",
    description: "A step-by-step method to identify which parts of your expertise AI can amplify — without losing your unique voice.",
  },
  {
    icon: Layers,
    title: "AI Tools That Matter",
    description: "Cut through the noise. Learn which 3-4 tools actually move the needle for creators and professionals.",
  },
  {
    icon: Zap,
    title: "Your First AI Workflow",
    description: "Walk away with a working AI workflow you can use immediately — no coding or technical skills required.",
  },
  {
    icon: Rocket,
    title: "The AI Challenge Preview",
    description: "Get an exclusive look at our hands-on AI Challenge and how it will help you build your AI-powered clone.",
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
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">What You'll Learn</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          In {"\u00A0"}90 minutes, you'll walk away with actionable insights you can use right away.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {takeaways.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-4 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatYoullLearn;
