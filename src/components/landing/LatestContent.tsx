import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, BookOpen, Cpu } from "lucide-react";

const Placeholder = ({ label }: { label: string }) => (
  <div className="aspect-video rounded-lg bg-gradient-to-br from-secondary/80 to-secondary/30 border border-border flex items-center justify-center text-muted-foreground text-xs uppercase tracking-wider">
    {label}
  </div>
);

const LatestContent = () => (
  <section id="latest" className="py-16 sm:py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-10 sm:mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Latest from both sides</h2>
        <p className="text-muted-foreground">Fresh teachings, ideas, and conversations.</p>
      </motion.div>

      {/* Latest Bible + Latest Builder side by side */}
      <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group rounded-2xl border border-border bg-card/40 p-5 sm:p-6 hover:border-primary/40 transition-all"
        >
          <div className="flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Latest Bible Study
          </div>
          <Placeholder label="Cover image" />
          <h3 className="text-xl sm:text-2xl font-bold mt-5 mb-2 group-hover:text-primary transition-colors">
            Guarding Your Heart in a Noisy World
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            A walk through Proverbs 4:23 — what it actually means to guard your heart and
            why it shapes every other decision you'll make.
          </p>
          <Button variant="ghost" className="px-0 text-primary hover:text-primary hover:bg-transparent">
            Read the study <ArrowRight className="ml-1" />
          </Button>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group rounded-2xl border border-border bg-card/40 p-5 sm:p-6 hover:border-primary/40 transition-all"
        >
          <div className="flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Latest AI & Business Teaching
          </div>
          <Placeholder label="Cover image" />
          <h3 className="text-xl sm:text-2xl font-bold mt-5 mb-2 group-hover:text-primary transition-colors">
            Clone Yourself with AI: The Real Framework
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            The 5 mistakes costing creators and business owners time and money — and the
            simple system to multiply what you already carry.
          </p>
          <Button variant="ghost" className="px-0 text-primary hover:text-primary hover:bg-transparent">
            Read the teaching <ArrowRight className="ml-1" />
          </Button>
        </motion.article>
      </div>

      {/* Featured YouTube */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card/40 p-5 sm:p-7"
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" />
            <h3 className="text-xl sm:text-2xl font-bold">Featured YouTube Videos</h3>
          </div>
          <Button variant="outline" size="sm" className="border-border">
            View channel <ArrowRight className="ml-1" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="group cursor-pointer">
              <div className="relative aspect-video rounded-lg bg-gradient-to-br from-secondary/80 to-secondary/30 border border-border overflow-hidden flex items-center justify-center">
                <Play className="w-10 h-10 text-primary/70 group-hover:scale-110 group-hover:text-primary transition-all" />
              </div>
              <p className="text-sm font-semibold mt-3 group-hover:text-primary transition-colors">
                Video title placeholder #{n}
              </p>
              <p className="text-xs text-muted-foreground mt-1">12:34 · Ricky Rose</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default LatestContent;
