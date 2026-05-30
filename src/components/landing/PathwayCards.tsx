import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Cpu, ArrowRight } from "lucide-react";

const cards = [
  {
    id: "faith",
    icon: BookOpen,
    title: "Bible Study with Ricky Rose",
    subtitle: "Bible studies, spiritual growth, and wisdom for the heart.",
    description:
      "Teachings on Scripture, obedience, purpose, guarding your heart, mindset, emotional patterns, and learning how to apply God's Word to everyday life.",
    cta: "Enter Bible Study with Ricky Rose",
    tags: ["Bible Studies", "Mindset", "Purpose", "Wisdom"],
  },
  {
    id: "builder",
    icon: Cpu,
    title: "AI & Business",
    subtitle: "AI, leverage, content, and systems for builders.",
    description:
      "Teachings on AI tools and workflows, business strategy, content creation, personal brand, communication, automation, and building offers that create real leverage.",
    cta: "Enter AI & Business",
    tags: ["AI", "Business", "Content", "Systems"],
  },
];

const PathwayCards = () => (
  <section id="pathways" className="py-16 sm:py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Choose your door</h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          Two paths. Same foundation. Walk through whichever one you need today.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              id={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-7 sm:p-9 hover:border-primary/50 transition-all overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{card.title}</h3>
                <p className="text-primary/90 font-medium mb-4">{card.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{card.description}</p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary/70 text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  className="bg-cta text-cta-foreground hover:bg-cta/90 font-semibold w-full sm:w-auto"
                  onClick={() => document.getElementById("latest")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {card.cta}
                  <ArrowRight className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default PathwayCards;
