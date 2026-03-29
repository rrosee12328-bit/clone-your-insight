import { motion } from "framer-motion";

const ProblemSection = () => (
  <section className="py-20 sm:py-28 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-6">
          5 Costly AI Mistakes That Are{" "}
          <span className="text-primary">Costing You Time, Money, and Opportunity</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you're building a business, growing a brand, or trying to turn what you know into income — this live training reveals the 5 common AI mistakes holding you back and shows you the exact framework to multiply what you already have into real results.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
