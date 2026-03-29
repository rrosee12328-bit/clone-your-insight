import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  consent: z.boolean().refine((v) => v === true, "You must agree to receive communications"),
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", consent: false },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: Connect to Supabase once Cloud is enabled
      console.log("Registration:", data);
      // Simulate a brief delay
      await new Promise((r) => setTimeout(r, 600));
      toast.success("You're registered! Check your email for confirmation.");
      navigate("/thank-you");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-20 sm:py-28 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Reserve Your Spot</h2>
          <p className="text-muted-foreground text-lg">
            It's free. Seats are limited. Sign up now to save yours.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your first name"
                        className="bg-secondary/50 border-border"
                        {...field}
                      />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="bg-secondary/50 border-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-muted-foreground font-normal cursor-pointer">
                        I agree to the{" "}
                        <a href="/terms" target="_blank" className="text-primary underline hover:text-primary/80">Terms of Service</a>
                        {" "}and{" "}
                        <a href="/privacy" target="_blank" className="text-primary underline hover:text-primary/80">Privacy Policy</a>
                        , and consent to receive webinar reminders and related communications. You can
                        unsubscribe at any time.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full text-base py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register for Free"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                🔒 Your information is secure and will never be shared.
              </p>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
};

export default RegistrationForm;
