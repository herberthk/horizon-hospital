
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimatedWrapper from '@/components/shared/animated-wrapper';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const CallToActionSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      setOffsetY(window.pageYOffset);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-primary/5 relative overflow-hidden">
       <div
        className="absolute inset-0 opacity-10" // Slightly increased opacity from 5 for better visibility
        style={{
          transform: `translateY(${offsetY * 0.15}px)`, // Different, more subtle factor
          willChange: 'transform',
        }}
       >
        <Image
          src="/assets/hospital.jpg" // Made image taller for parallax
          alt="Subtle parallax background pattern"
          layout="fill"
          objectFit="cover"
          data-ai-hint="healthcare network" // New hint
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimatedWrapper>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Prioritize Your Health?
          </h2>
        </AnimatedWrapper>
        <AnimatedWrapper delay="delay-200">
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Our team of dedicated professionals is here to support you on your journey to wellness. Schedule a consultation or learn more about our services today.
          </p>
        </AnimatedWrapper>
        <AnimatedWrapper delay="delay-400" className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/80 text-white shadow-lg transform transition-transform hover:scale-105">
            <Link href="/book-appointment">Book an Appointment</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary shadow-lg transform transition-transform hover:scale-105">
            <Link href="/contact-us">Contact Our Team</Link>
          </Button>
        </AnimatedWrapper>
      </div>
    </section>
  );
};

export default CallToActionSection;
