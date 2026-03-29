import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3">
        <h2>1. Information We Collect</h2>
        <p>When you register for our webinar, we collect your first name and email address. We also collect basic usage data through essential cookies to ensure the website functions properly.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Send you webinar registration confirmations and reminders</li>
          <li>Deliver the webinar content you signed up for</li>
          <li>Send occasional related communications (only with your consent)</li>
          <li>Improve our website and services</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers (such as email delivery services) who assist us in operating our website, solely to perform tasks on our behalf.</p>

        <h2>4. Cookies</h2>
        <p>We use essential cookies to make the site work. These cookies do not track you across other websites and are not used for advertising purposes.</p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Unsubscribe from communications at any time</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>

        <h2>7. Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@vektiss.com" className="text-primary hover:underline">info@vektiss.com</a>.</p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
