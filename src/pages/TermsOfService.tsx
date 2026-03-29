import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using this website and registering for our webinar, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

        <h2>2. Webinar Registration</h2>
        <p>Registration for our webinar is free. By registering, you agree to provide accurate information and consent to receiving communications related to the event.</p>

        <h2>3. Intellectual Property</h2>
        <p>All content presented during the webinar, including but not limited to slides, recordings, materials, and methodologies, is the intellectual property of Clone Yourself and may not be reproduced, distributed, or used commercially without prior written permission.</p>

        <h2>4. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use the service for any unlawful purpose</li>
          <li>Share your registration with unauthorized parties</li>
          <li>Attempt to disrupt or interfere with the webinar or website</li>
          <li>Record or redistribute webinar content without permission</li>
        </ul>

        <h2>5. Disclaimer</h2>
        <p>The webinar content is provided for educational and informational purposes only. We make no guarantees regarding specific results or outcomes from applying the strategies discussed.</p>

        <h2>6. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, Clone Yourself shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>

        <h2>7. Modifications</h2>
        <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the service constitutes acceptance of the updated terms.</p>

        <h2>8. Contact</h2>
        <p>For questions about these terms, contact us at <a href="mailto:legal@cloneyourself.ai" className="text-primary hover:underline">legal@cloneyourself.ai</a>.</p>
      </div>
    </div>
  </div>
);

export default TermsOfService;
