import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const GHL_LOCATION_ID = "M5aYWb66Z8q0IktyodrQ";
const GHL_API_KEY = "pit-da46b16a-f86d-4fbc-ad2d-22a2bfb00440";

const categories = ["Faith", "Business", "AI", "Mindset", "Content"];

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

type FormValues = z.infer<typeof schema>;

const subscribe = async (data: FormValues) => {
  const payload = {
    firstName: data.firstName,
    email: data.email,
    locationId: GHL_LOCATION_ID,
    tags: ["newsletter-subscriber", "wisdom-leverage-letter"],
    source: "rickyrose.com",
  };
  await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

const NewsletterSection = () => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      await subscribe(data);
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      toast.success("You're in. Check your inbox for confirmation.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 sm:py-28 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 mb-5">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            The Wisdom & Leverage Letter
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            A newsletter for people who want to think clearer, build better, grow spiritually,
            and use their gifts with purpose.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((c) => (
              <span
                key={c}
                className="text-xs px-3 py-1 rounded-full bg-secondary/70 border border-border text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First name" className="bg-secondary/50 border-border h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" className="bg-secondary/50 border-border h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-cta text-cta-foreground hover:bg-cta/90 font-bold text-base h-12 shadow-lg shadow-cta/20"
              >
                {submitting ? "JOINING..." : "JOIN THE LETTER"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Free. No spam. Unsubscribe anytime.
              </p>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
