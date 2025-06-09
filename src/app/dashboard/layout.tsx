import type { Metadata } from "next";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HospitalIcon, LogOut, Settings, BarChart3, ListChecks, LayoutDashboard } from "lucide-react";
import UserNav from "@/components/dashboard/UserNav";
import SidebarNav from "@/components/dashboard/SidebarNav";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";


export const metadata: Metadata = {
  title: "Dashboard - Horizon View",
  description: "Call analytics and logs for Horizon Hospital.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutClient>
      <SidebarProvider defaultOpen>
        <Sidebar>
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors">
                <HospitalIcon className="h-8 w-8 text-sidebar-primary" />
                <h2 className="font-headline text-xl font-semibold">Horizon View</h2>
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-sidebar-border">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <h1 className="font-headline text-2xl font-semibold text-foreground">Dashboard</h1>
            </div>
            <UserNav />
          </header>
          <main className="flex-1 p-4 sm:p-6">
            {children}
          </main>
          <footer className="border-t p-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Horizon Hospital. Built for efficiency.
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </DashboardLayoutClient>
  );
}
