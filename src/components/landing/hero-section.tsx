
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AnimatedWrapper from '@/components/shared/animated-wrapper';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      setOffsetY(window.pageYOffset);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call to set position
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 pt-32 sm:pt-20 bg-linear-to-br from-background to-primary/10 overflow-hidden">
      {/* Parallax Background Image Layer */}
      <div
        className="absolute inset-0 z-0" // Ensure it's behind content
        style={{
          transform: `translateY(${offsetY * 0.4}px)`, // Slower scroll speed for parallax
          willChange: 'transform', // Performance hint
        }}
      >
        <Image
           src="/assets/hospital.jpg" // Taller image for better parallax coverage
          alt="Parallax medical background"
          layout="fill"
          // objectFit="cover"
          className="opacity-50" // Existing opacity for subtlety
          priority
          data-ai-hint="medical research" // Updated hint
        />
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimatedWrapper>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Welcome to <span className="text-primary">Horizon Hospital</span>
          </h1>
        </AnimatedWrapper>
        <AnimatedWrapper delay="delay-200">
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 italic text-muted-foreground">
            Your trusted partner in comprehensive healthcare. We provide compassionate, expert medical services to nurture your well-being.
          </p>
        </AnimatedWrapper>
        <AnimatedWrapper delay="delay-400">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/80 text-accent-foreground shadow-lg transform transition-transform hover:scale-105">
            <Link className='text-white' href="/book-appointment">Book an Appointment</Link>
          </Button>
        </AnimatedWrapper>
      </div>
    </section>
  );
};

export default HeroSection;
