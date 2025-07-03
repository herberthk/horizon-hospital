import type { Metadata } from "next";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - Horizon Hospital",
  description: "Call analytics and logs for Horizon Hospital.",
};

const DashboardLayout = async ({
  children, // This is the pageSpecificContent
}: {
  children: React.ReactNode;
}) => {
  const isUserAuthenticated = await isAuthenticated();
  // console.log("Is authenticated", isUserAuthenticated);
  if (!isUserAuthenticated) redirect("/login");
  return <DashboardLayoutClient pageSpecificContent={children} />;
};

export default DashboardLayout;
