import Navbar from '@/components/ui/Navbar';
import CinematicBackground from '@/components/ui/CinematicBackground';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ContentRows from '@/components/home/ContentRows';
import PlansPreview from '@/components/home/PlansPreview';
import FAQSection from '@/components/home/FAQSection';
import Footer from '@/components/ui/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <CinematicBackground theme="mixed" />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <ContentRows />
        <PlansPreview />
        <FAQSection />
        <Footer />
      </div>
    </main>
  );
}
