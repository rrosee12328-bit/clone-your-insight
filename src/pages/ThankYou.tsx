import { motion } from "framer-motion";
import { CheckCircle, MailWarning, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WEBINAR_TITLE } from "@/lib/constants";

const ThankYou = () => {
  const shareUrl = window.location.origin;
  const shareText = `I just joined the waitlist for "${WEBINAR_TITLE}" — a live masterclass on using AI to multiply your expertise. Join me!`;

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

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">You're On the List! 🎉</h1>
        <p className="text-lg text-muted-foreground mb-8">
          You've been added to the waitlist. We'll email you as soon as the next masterclass date is announced — keep an eye on your inbox!
        </p>

        {/* What to expect card */}
        <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>✅ You're officially on the waitlist for <span className="text-foreground font-medium">{WEBINAR_TITLE}</span></p>
            <p>📧 We'll send you an email the moment the next session is scheduled</p>
            <p>🔔 You'll get early access to register before the public</p>
          </div>
        </div>

        {/* Share */}
        <div className="flex justify-center mb-12">
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
            <h3 className="text-lg font-semibold text-amber-400">Check Your Inbox</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Check your <span className="text-foreground font-medium">spam or promotions folder</span> to
            make sure you received our confirmation. When we announce the next masterclass date,
            you'll be the first to know!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
