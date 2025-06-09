import { LoginForm } from "@/components/auth/LoginForm";
import { HospitalIcon } from "lucide-react"; // Using HospitalIcon as a generic logo
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-primary p-3 text-primary-foreground mb-4">
            <HospitalIcon className="h-10 w-10" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
            Horizon View
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Please sign in to your account.
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Horizon Hospital. All rights reserved.
        </p>
      </div>
       {/* Optional: Add a subtle background image or pattern element if desired */}
       {/* For example, a large, faded hospital-related SVG or image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Example: A decorative background pattern or image */}
        {/* <Image
          src="https://placehold.co/1920x1080/F0F8FF/E0EFFF.png?text=."
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
          data-ai-hint="abstract pattern"
        /> */}
      </div>
    </div>
  );
}
