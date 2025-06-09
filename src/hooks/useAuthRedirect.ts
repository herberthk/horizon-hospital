"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthRedirect(redirectTo = '/') {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedInHorizonView') === 'true';
      if (!isLoggedIn) {
        router.replace(redirectTo);
      }
    }
  }, [isMounted, router, redirectTo]);

  // Optional: return a loading state until mount and check are complete
  // For now, components using this hook should handle their own loading state or null render
}
