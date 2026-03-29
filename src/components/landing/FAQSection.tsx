import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is this webinar really free?",
    a: "Yes, 100% free. No credit card required. Just sign up and show up.",
  },
  {
    q: "Do I need any technical skills?",
    a: "Not at all. This webinar is designed for professionals and creators who want to use AI — not become AI engineers. If you can use email and social media, you're good.",
  },
  {
    q: "Will there be a replay?",
    a: "We'll share a limited-time replay with registered attendees, but the live session will include exclusive Q&A and bonus content you won't want to miss.",
  },
  {
    q: "What is the AI Challenge?",
    a: "The AI Challenge is our upcoming hands-on program where you'll build your own AI-powered clone step by step. The webinar will give you a full preview and an exclusive early-bird offer.",
  },
  {
    q: "How long is the webinar?",
    a: "Approximately 90 minutes, including a live Q&A session at the end.",
  },
];

const FAQSection = () => (
  <section className="py-20 sm:py-28 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-border rounded-lg px-6 bg-card/50 backdrop-blur-sm"
          >
            <AccordionTrigger className="text-left hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  </section>
);

export default FAQSection;
