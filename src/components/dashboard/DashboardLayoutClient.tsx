"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import React, { useEffect, useState } from "react";

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  useAuthRedirect(); // Redirects if not logged in
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (isMounted && typeof window !== 'undefined' && localStorage.getItem('isLoggedInHorizonView') !== 'true') {
    return null; // Or a loading spinner while redirecting
  }
  
  if (!isMounted) {
     return null; // Or a loading skeleton for the dashboard
  }

  return <>{children}</>;
}
