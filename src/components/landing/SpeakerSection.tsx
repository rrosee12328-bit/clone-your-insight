import { motion } from "framer-motion";
import rickyPhoto from "@/assets/ricky-rose.jpg";

const SpeakerSection = () => (
  <section className="py-20 sm:py-28 px-4 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative max-w-4xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Your Host</h2>

      <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
        {/* Photo placeholder — upload your headshot to replace */}
        <div className="w-40 h-40 rounded-full flex-shrink-0 border-2 border-primary/20 overflow-hidden">
          <img src={rickyPhoto} alt="Ricky Rose, CEO of Vektiss" className="w-full h-full object-cover object-[center_15%]" />
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-1">Ricky Rose</h3>
          <p className="text-primary font-medium mb-4">CEO of Vektiss · AI Strategy Expert</p>
          <p className="text-muted-foreground leading-relaxed">
            With over a decade of experience helping professionals and creators leverage technology,
            Ricky Rose has guided thousands of people through their AI journey. As CEO of Vektiss,
            his unique approach focuses on building on what you already know — not starting from scratch.
            He believes everyone has expertise worth multiplying, and AI is the tool to do it.
          </p>
        </div>
      </div>
    </motion.div>
  </section>
);

export default SpeakerSection;
