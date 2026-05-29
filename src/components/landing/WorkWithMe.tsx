import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Briefcase } from "lucide-react";

const offerings = [
  {
    icon: Briefcase,
    label: "Work With Ricky",
    description: "1:1 strategy, coaching, and content partnerships for builders and leaders ready to scale with clarity.",
    cta: "Inquire",
  },
  {
    icon: Sparkles,
    label: "Vektiss / AI Systems",
    description: "Custom AI systems, content engines, and personal brand infrastructure built by the Vektiss team.",
    cta: "Visit Vektiss",
  },
];

const WorkWithMe = () => (
  <section id="work" className="py-16 sm:py-24 px-4 border-t border-border/50">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Work with me</h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          Two ways to go deeper beyond the content.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
        {offerings.map((o, i) => {
          const Icon = o.icon;
          return (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-7 sm:p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{o.label}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{o.description}</p>
              <Button
                variant="outline"
                className="border-primary/40 hover:bg-primary/10 hover:border-primary"
              >
                {o.cta} <ArrowRight className="ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WorkWithMe;
