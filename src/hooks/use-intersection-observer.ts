"use client";

import React, { useEffect, useState } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  {
    threshold = 0.1,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = true,
  }: Args = {} // Provide default empty object for Args
): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) {
      // Fallback for browsers that don't support IntersectionObserver or if node is not available
      // You might want to set isIntersecting to true to show elements by default
      setIsIntersecting(true);
      return;
    }
    
    let frozen = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (freezeOnceVisible) {
          frozen = true;
          observer.unobserve(node);
        }
      } else if (!freezeOnceVisible) {
         // Only set to false if not frozen and element is not intersecting
        setIsIntersecting(false);
      }
    }, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
   
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible]);

  return isIntersecting;
}

export default useIntersectionObserver;
