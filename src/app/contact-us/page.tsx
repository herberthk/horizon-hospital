import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="grow container mx-auto px-4 py-20 pt-32 sm:pt-24">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          We are here to help. Reach out to us through any of the channels below, or visit us at our facility.
        </p>
        
        <div className="max-w-3xl mx-auto bg-card p-8 sm:p-12 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Get in Touch</h2>
              <ul className="space-y-6 text-foreground">
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1 text-accent shrink-0" />
                  <div>
                    <h3 className="font-medium">Our Address</h3>
                    <p className="text-muted-foreground">123 Horizon Way, Wellness City, ST 12345</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1 text-accent shrink-0" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">(123) 456-7890</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1 text-accent shrink-0" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:info@horizonhaven.com" className="text-muted-foreground hover:text-accent transition-colors">info@horizonhaven.com</a>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Opening Hours</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
                <li>Saturday: 9:00 AM - 1:00 PM</li>
                <li>Sunday: Closed</li>
                <li>Emergency Services: 24/7</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
