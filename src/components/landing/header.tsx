"use client";

import Link from 'next/link';
import LogoIcon from '@/components/icons/logo-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Horizon Hospital Home">
          <LogoIcon className="h-8 w-auto sm:h-10" />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {pathname !== '/login' && (
            <Button variant="ghost" asChild className="text-sm sm:text-base hover:bg-primary/80">
              <Link href="/login">Login</Link>
            </Button>
          )}
          <Button variant="ghost" asChild className="text-sm sm:text-base hover:bg-primary/80">
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
