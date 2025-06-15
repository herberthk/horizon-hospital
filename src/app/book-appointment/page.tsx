import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookAppointmentPage() {
  return (
  <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="grow container mx-auto px-4 py-20 pt-32 sm:pt-24 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-8">Book an Appointment</h1>
        <p className="text-lg text-muted-foreground mb-12">
          This page is under construction. Please check back soon to book your appointment online.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
