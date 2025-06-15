import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import DepartmentDirectory from '@/components/landing/department-directory';
import CallToActionSection from '@/components/landing/call-to-action-section';
import Footer from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="grow">
        <HeroSection />
        <div id="departments"> {/* Anchor for navigation */}
          <DepartmentDirectory />
        </div>
        <CallToActionSection />
         <Footer />
      </main>
    </div>
  );
}
