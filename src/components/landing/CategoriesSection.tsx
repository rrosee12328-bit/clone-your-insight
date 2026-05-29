import { motion } from "framer-motion";
import { BookOpen, Heart, Cpu, PenLine, Brain, MessageSquare } from "lucide-react";

const categories = [
  { icon: BookOpen, label: "Bible Studies", side: "Faith" },
  { icon: Heart, label: "Faith Reflections", side: "Faith" },
  { icon: Cpu, label: "AI & Business", side: "Builder" },
  { icon: PenLine, label: "Content Strategy", side: "Builder" },
  { icon: Brain, label: "Mindset & Psychology", side: "Both" },
  { icon: MessageSquare, label: "Communication", side: "Both" },
];

const CategoriesSection = () => (
  <section className="py-16 sm:py-24 px-4 border-t border-border/50">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">What I write about</h2>
        <p className="text-muted-foreground">Six lanes of content, one worldview.</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-5 rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-card/70 transition-all cursor-pointer"
            >
              <Icon className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-sm sm:text-base">{cat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{cat.side}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
