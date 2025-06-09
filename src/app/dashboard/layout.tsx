
import type { Metadata } from "next";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

export const metadata: Metadata = {
  title: "Dashboard - Horizon View",
  description: "Call analytics and logs for Horizon Hospital.",
};

export default function DashboardLayout({
  children, // This is the pageSpecificContent
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutClient pageSpecificContent={children} />
  );
}
