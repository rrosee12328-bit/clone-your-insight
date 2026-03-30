import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const GHL_LOCATION_ID = "M5aYWb66Z8q0IktyodrQ";
const GHL_API_KEY = "pit-da46b16a-f86d-4fbc-ad2d-22a2bfb00440";

const focusOptions = [
  "Growing my business and getting more clients",
  "Creating content and building my audience",
  "Saving time and getting out of the day-to-day",
  "Turning my knowledge into a product or offer",
] as const;

const aiLevelOptions = [
  "I use it here and there but I know I'm not getting the most out of it",
  "I've tried it but the results feel generic and not specific to my business",
  "I feel like every time I figure it out, something new drops and I'm behind again",
  "I honestly don't know where to start or what tools actually matter",
  "I use it regularly but I want to build real systems, not just prompts",
] as const;

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "Too long"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Too long"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Too long"),
  focus: z.string().min(1, "Please select your main focus"),
  aiLevel: z.string().min(1, "Please select where you are with AI"),
  consent: z.boolean().refine((v) => v === true, "You must agree to continue"),
});

type FormValues = z.infer<typeof formSchema>;

const sendToGoHighLevel = async (data: FormValues) => {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    locationId: GHL_LOCATION_ID,
    tags: ["masterclass-registrant"],
    customFields: [
      { key: "main_focus", field_value: data.focus },
      { key: "ai_level", field_value: data.aiLevel },
    ],
    source: "clone.vektiss.com",
  };

  const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("GHL API error:", response.status, errorText);
    // Don't throw — we still want to redirect the user even if GHL has a hiccup
  }
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      focus: "",
      aiLevel: "",
      consent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Send to GoHighLevel CRM
      await sendToGoHighLevel(data);
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
            Seats are limited. Sign up now to save yours.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" className="bg-secondary/50 border-border" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" className="bg-secondary/50 border-border" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" className="bg-secondary/50 border-border" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" className="bg-secondary/50 border-border" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Focus Question */}
              <FormField
                control={form.control}
                name="focus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your main focus right now? *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue placeholder="Select your main focus" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {focusOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AI Level Question */}
              <FormField
                control={form.control}
                name="aiLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When it comes to AI, where are you right now? *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue placeholder="Select where you are with AI" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {aiLevelOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Consent */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-muted-foreground font-normal cursor-pointer">
                        I agree to receive emails and SMS messages from Vektiss regarding this webinar,
                        future trainings, and offers. I understand I can opt out at any time by replying
                        STOP. Msg &amp; data rates may apply. View our{" "}
                        <a href="/terms" target="_blank" className="text-primary underline hover:text-primary/80">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" target="_blank" className="text-primary underline hover:text-primary/80">
                          Privacy Policy
                        </a>
                        .
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full text-base py-6 bg-cta text-cta-foreground hover:bg-cta/90 shadow-lg shadow-cta/20 font-bold tracking-wide hover:scale-[1.01] transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SECURING YOUR SPOT..." : "SECURE MY SPOT"}
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
