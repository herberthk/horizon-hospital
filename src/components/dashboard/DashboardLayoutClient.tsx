"use client";

// import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import React, { useEffect, useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HospitalIcon, Settings } from "lucide-react";
import UserNav from "@/components/dashboard/UserNav";
import SidebarNav from "@/components/dashboard/SidebarNav";
import { Skeleton } from "@/components/ui/skeleton";
import { useFullYear } from "@/hooks";

export default function DashboardLayoutClient({
  pageSpecificContent,
}: {
  pageSpecificContent: React.ReactNode;
}) {
  // useAuthRedirect();
  const [isMounted, setIsMounted] = useState(false);
  const currentYear = useFullYear();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
            >
              <HospitalIcon className="h-8 w-8 text-sidebar-primary" />
              <h2 className="font-headline text-xl font-semibold">
                Horizon Hospital
              </h2>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
          {!isMounted ? (
            <div className="p-4 space-y-2">
              <Skeleton className="h-10 rounded-md w-full" />
              <Skeleton className="h-10 rounded-md w-full" />
              <Skeleton className="h-10 rounded-md w-full" />
            </div>
          ) : (
            <SidebarNav />
          )}
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            disabled={!isMounted}
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" disabled={!isMounted} />
            <h1 className="font-headline text-2xl font-semibold text-foreground">
              Dashboard
            </h1>
          </div>
          {!isMounted ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <UserNav />
          )}
        </header>
        <main className="flex-1 p-4 sm:p-6">
          {!isMounted ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-1/2 mb-6" />{" "}
              {/* Page title skeleton */}
              <Skeleton className="h-72 w-full" /> {/* Page content skeleton */}
            </div>
          ) : (
            pageSpecificContent
          )}
        </main>
        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          &copy; {currentYear} Horizon Hospital. Built for efficiency.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
