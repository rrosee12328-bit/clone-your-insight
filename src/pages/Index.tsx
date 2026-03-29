import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import WhatYoullLearn from "@/components/landing/WhatYoullLearn";
import SpeakerSection from "@/components/landing/SpeakerSection";
import RegistrationForm from "@/components/landing/RegistrationForm";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import CookieConsent from "@/components/landing/CookieConsent";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Hero />
    <ProblemSection />
    <SolutionSection />
    <WhatYoullLearn />
    <SpeakerSection />
    <RegistrationForm />
    <FAQSection />
    <Footer />
    <CookieConsent />
  </div>
);

export default Index;
