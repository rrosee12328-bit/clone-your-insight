import StickyNav from "@/components/landing/StickyNav";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import WhatYoullLearn from "@/components/landing/WhatYoullLearn";
import SpeakerSection from "@/components/landing/SpeakerSection";
import CTABreak from "@/components/landing/CTABreak";
import RegistrationForm from "@/components/landing/RegistrationForm";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import CookieConsent from "@/components/landing/CookieConsent";

const Index = () => (
  <div className="min-h-screen bg-background">
    <StickyNav />
    <Hero />
    <SolutionSection />
    <SolutionSection />
    <CTABreak heading="Don't Miss This Free Masterclass" />
    <WhatYoullLearn />
    <SpeakerSection />
    <CTABreak heading="Reserve Your Seat Now!" subtext="Limited spots — secure yours today" />
    <RegistrationForm />
    <FAQSection />
    <CTABreak heading="Ready to Clone Yourself with AI?" />
    <Footer />
    <CookieConsent />
  </div>
);

export default Index;
