import StickyNav from "@/components/landing/StickyNav";
import Hero from "@/components/landing/Hero";
import IntroSection from "@/components/landing/IntroSection";
import PathwayCards from "@/components/landing/PathwayCards";
import TwoLanesSection from "@/components/landing/TwoLanesSection";
import FeaturedVideos from "@/components/landing/FeaturedVideos";
import NewsletterSection from "@/components/landing/NewsletterSection";
import WorkWithMe from "@/components/landing/WorkWithMe";
import Footer from "@/components/landing/Footer";
import CookieConsent from "@/components/landing/CookieConsent";

const Index = () => (
  <div className="min-h-screen bg-background">
    <StickyNav />
    <Hero />
    <IntroSection />
    <PathwayCards />
    <TwoLanesSection />
    <FeaturedVideos />
    <NewsletterSection />
    <WorkWithMe />
    <Footer />
    <CookieConsent />
  </div>
);

export default Index;
