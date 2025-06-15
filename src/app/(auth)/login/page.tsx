
import { LoginForm } from "@/components/auth/LoginForm";

import { HospitalIcon } from "lucide-react"; // Using HospitalIcon as a generic logo
// import Image from "next/image";
import Link from "next/link";

const LoginPage =()=> {
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
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Horizon Hospital. All rights reserved.
        </p>
    </div>
  );
}
export default LoginPage;
