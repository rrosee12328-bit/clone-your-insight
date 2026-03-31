import { motion } from "framer-motion";
import { CheckCircle, Calendar, Share2, MailWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEBINAR_DATE, WEBINAR_TITLE, WEBINAR_DURATION_MINUTES } from "@/lib/constants";

const ThankYou = () => {
  const formattedDate = WEBINAR_DATE.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });

  const formattedTime = "7:00 PM CST";

  const generateICS = () => {
    const start = WEBINAR_DATE.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end = new Date(WEBINAR_DATE.getTime() + WEBINAR_DURATION_MINUTES * 60000)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${WEBINAR_TITLE}`,
      "DESCRIPTION:Join the live webinar to learn how to clone yourself with AI.",
      "LOCATION:Online (link will be sent via email)",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clone-yourself-webinar.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareUrl = window.location.origin;
  const shareText = `I just signed up for "${WEBINAR_TITLE}" — a live webinar on using AI to multiply your expertise. Join me!`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">You're In! 🎉</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Check your inbox for a confirmation email with all the details.
        </p>

        {/* Webinar details card */}
        <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">Webinar Details</h2>
          <div className="space-y-2 text-muted-foreground">
            <p><span className="text-foreground font-medium">Event:</span> {WEBINAR_TITLE}</p>
            <p><span className="text-foreground font-medium">Date:</span> {formattedDate}</p>
            <p><span className="text-foreground font-medium">Time:</span> {formattedTime}</p>
            <p><span className="text-foreground font-medium">Duration:</span> ~{WEBINAR_DURATION_MINUTES} minutes</p>
            <p><span className="text-foreground font-medium">Location:</span> Online (link sent via email)</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button onClick={generateICS} size="lg" className="gap-2">
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => {
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
              window.open(url, "_blank");
            }}
          >
            <Share2 className="w-4 h-4" />
            Share on X
          </Button>
        </div>

        {/* Spam check reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/5"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <MailWarning className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">Don't Miss Your Confirmation</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Check your <span className="text-foreground font-medium">spam or promotions folder</span> to
            make sure you received your confirmation email. Add the event to your calendar now so you
            don't forget — we'll send the webinar link closer to the date!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
