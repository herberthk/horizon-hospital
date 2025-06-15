"use client";

import React from 'react';
import { useRef } from 'react';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationClass?: string;
  delay?: string; // e.g., 'delay-200', 'delay-500'
  threshold?: number;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  className,
  animationClass = 'animate-fade-in-up',
  delay = '',
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold, freezeOnceVisible: true });

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 transform transition-all duration-500 ease-out',
        className,
        isVisible ? `${animationClass} ${delay} opacity-100 translate-y-0` : 'translate-y-5'
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedWrapper;
