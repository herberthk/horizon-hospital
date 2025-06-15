import Link from 'next/link';
import LogoIcon from '@/components/icons/logo-icon';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <LogoIcon className="h-10 filter brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-400">
              Providing exceptional healthcare with compassion and expertise.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#departments" className="hover:text-primary transition-colors">Departments</Link></li>
              <li><Link href="/book-appointment" className="hover:text-primary transition-colors">Book Appointment</Link></li>
              <li><Link href="/schedule-consultation" className="hover:text-primary transition-colors">Schedule Consultation</Link></li>
              <li><Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
                <span>123 Horizon Way, Wellness City, ST 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <a href="mailto:info@horizonhaven.com" className="hover:text-primary transition-colors">info@horizonhaven.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t !border-t-gray-400/40 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Horizon Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
