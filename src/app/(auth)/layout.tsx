import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React from 'react'
import Header from '@/components/landing/header';

const AuthLayout = async ({ children }: { children: React.ReactNode }): Promise<React.ReactNode> => {
    const isUserAuthenticated = await isAuthenticated();
      // console.log("Is authenticated", isUserAuthenticated);
      if (isUserAuthenticated) redirect("/dashboard");
    
  return <div className="flex flex-col min-h-screen bg-background">
      <Header />
    {children}
    </div>;
};

export default AuthLayout;
