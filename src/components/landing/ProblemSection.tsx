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
          5 Lies Holding You Back from{" "}
          <span className="text-primary">Leveraging AI</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you're building a business, creating content, or scaling your expertise,
          this Masterclass reveals the 5 common lies keeping you stuck and gives you the
          framework to break through.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
