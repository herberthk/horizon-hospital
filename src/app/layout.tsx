import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import FabCallButton from '@/components/shared/fab-call-button';
import { seedCalls, seedCallTrendData } from '@/lib/seed';

export const metadata: Metadata = {
  title: 'Horizon Hospital',
  description: 'Voice Agent support with Visualization Dashboard for Horizon Hospital',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) =>{
  // await seedCallTrendData();
  // await seedCalls();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        {children}
        <Toaster />
        <FabCallButton />
      </body>
    </html>
  );
}

export default RootLayout;
