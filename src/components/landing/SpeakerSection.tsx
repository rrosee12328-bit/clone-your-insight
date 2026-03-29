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
      className="relative max-w-5xl mx-auto"
    >
      <p className="text-cta font-bold uppercase tracking-wider text-sm text-center mb-2">Meet Your Host</p>
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12">RICKY ROSE</h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 aspect-[3/4] max-h-[500px]"
        >
          <img
            src={rickyPhoto}
            alt="Ricky Rose, CEO of Vektiss"
            className="w-full h-full object-cover object-[center_15%]"
          />
        </motion.div>

        {/* Bio */}
        <div>
          <p className="text-cta font-semibold text-lg mb-4">CEO of Vektiss · AI Strategy Expert</p>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Ricky Rose is the CEO of Vektiss and helps businesses, creators, and experts use AI with clarity, purpose, and wisdom. With over a decade of experience in content, strategy, and digital systems, he helps people turn what they already know into scalable assets, simpler workflows, and new growth opportunities.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Guided by practical strategy and Biblical wisdom, Ricky's approach focuses on stewardship, intentionality, and building from a place of strength. He believes AI is most powerful when it helps you multiply what you already carry instead of forcing you to start over.
          </p>
        </div>
      </div>
    </motion.div>
  </section>
);

export default SpeakerSection;
