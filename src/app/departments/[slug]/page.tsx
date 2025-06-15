import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Landmark, Bone, Droplets, Baby, Eye, HelpCircle } from 'lucide-react';
import ToothIcon from '@/components/icons/tooth-icon';
import Image from 'next/image';

type DepartmentPageProps = {
  params: {
    slug: string;
  };
};

const departmentDetails: { [key: string]: { name: string; icon: React.ReactNode; description: string; imageHint: string} } = {
  accounting: { name: 'Accounting', icon: <Landmark className="h-16 w-16 text-primary" />, description: 'Our Accounting department ensures the financial stability and transparency of Horizon Hospital, managing budgets, patient billing, and financial planning with utmost precision and integrity, supporting our mission to provide accessible healthcare.', imageHint: 'office finance' },
  dentistry: { name: 'Dentistry', icon: <ToothIcon className="h-16 w-16 text-primary" />, description: 'The Dentistry department at Horizon Hospital offers a full range of dental services, from routine check-ups and cleanings to advanced cosmetic and restorative procedures, all aimed at maintaining your oral health and perfecting your smile.', imageHint: 'dental clinic' },
  orthopedics: { name: 'Orthopedics', icon: <Bone className="h-16 w-16 text-primary" />, description: 'Specializing in the diagnosis and treatment of musculoskeletal conditions, our Orthopedics team provides comprehensive care for bones, joints, ligaments, tendons, and muscles, helping patients regain mobility and live pain-free.', imageHint: 'orthopedic surgery' },
  urology: { name: 'Urology', icon: <Droplets className="h-16 w-16 text-primary" />, description: 'Our Urology department offers expert care for conditions affecting the urinary tract in both men and women, as well as the male reproductive system. We provide compassionate treatment for a wide range of urological issues.', imageHint: 'medical consultation' },
  pediatrics: { name: 'Pediatrics', icon: <Baby className="h-16 w-16 text-primary" />, description: 'Dedicated to the health and well-being of children from infancy through adolescence, our Pediatrics department provides comprehensive care, including routine check-ups, immunizations, and treatment for acute and chronic illnesses.', imageHint: 'child doctor' },
  ophthalmology: { name: 'Ophthalmology', icon: <Eye className="h-16 w-16 text-primary" />, description: 'The Ophthalmology department at Horizon Hospital is committed to preserving and improving vision. We offer a full spectrum of eye care services, from routine eye exams to advanced surgical procedures for various eye conditions.', imageHint: 'eye examination' },
};


export default function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = params;
  const department = departmentDetails[slug] || { name: 'Department', icon: <HelpCircle className="h-16 w-16 text-primary" />, description: 'Details for this department are coming soon.', imageHint: 'hospital interior' };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="grow container mx-auto px-4 py-20 pt-32 sm:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-6 border-b">
            {department.icon}
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-center sm:text-left">{department.name}</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>{department.description}</p>
              <p>Our team of specialists in the {department.name.toLowerCase()} department is dedicated to providing personalized and high-quality care. We utilize the latest technologies and treatment methods to ensure the best possible outcomes for our patients.</p>
              <p>Please contact us to learn more or to schedule an appointment with one of our {department.name.toLowerCase()} experts.</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl aspect-video">
               <Image 
                src="/assets/hospital.jpg"
                alt={`${department.name} department illustrative image`} 
                width={600} 
                height={400} 
                className="w-full h-full object-cover"
                data-ai-hint={department.imageHint}
                />
            </div>
          </div>

          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/book-appointment">Book an Appointment in {department.name}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="ml-4">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(departmentDetails).map((slug) => ({
    slug,
  }));
}
// export const dynamic = 'force-dynamic'; // Ensure this page is always fresh
// export const revalidate = 60; // Revalidate every 60 seconds
// export const fetchCache = 'force-no-store'; // Disable caching for this page
// export const runtime = 'edge'; // Use edge runtime for better performance