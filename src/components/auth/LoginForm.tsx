
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Simple Google G icon SVG
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0002 12.0002C12.0002 11.3922 11.9482 10.7972 11.8582 10.2282H6.9542V13.5782H9.9672C9.8252 14.2852 9.4372 15.1392 8.7292 15.6962L8.7232 15.7362L6.9052 17.1222L6.8432 17.1342C8.0102 18.1402 9.4552 18.7952 11.0212 18.7952C13.1202 18.7952 14.8982 17.9792 16.0902 16.7972L14.1102 15.3062C13.4632 15.7702 12.6172 16.0832 11.7102 16.0832C10.0172 16.0832 8.5792 15.0182 8.0392 13.5362L8.0002 13.5432L6.1062 12.0062L6.0812 11.9982C5.4772 10.5112 5.4772 8.86618 6.0812 7.37918L8.0002 5.83518L8.0392 5.84218C8.5792 4.36018 10.0172 3.29518 11.7102 3.29518C12.8822 3.29518 13.9042 3.72918 14.6862 4.43918L16.3402 2.79918C15.0052 1.59118 13.2592 0.864182 11.2402 0.864182C8.2792 0.864182 5.7312 2.56318 4.5802 4.95918C3.4292 7.35518 3.4292 10.1242 4.5802 12.5202C5.7312 14.9152 8.2792 16.6152 11.2402 16.6152C12.8822 16.6152 14.3452 16.1212 15.4952 15.2332V15.2332C16.4092 14.5042 17.0752 13.4052 17.0752 12.0002C17.0752 11.3922 17.0232 10.7972 16.9332 10.2282H11.0952V13.5782H14.1082C13.9662 14.2852 13.5782 15.1392 12.8702 15.6962L12.8642 15.7362L11.0462 17.1222L10.9842 17.1342C12.1512 18.1402 13.5962 18.7952 15.1622 18.7952C17.2612 18.7952 19.0392 17.9792 20.2312 16.7972L18.2512 15.3062C17.6042 15.7702 16.7582 16.0832 15.8512 16.0832C14.1582 16.0832 12.7202 15.0182 12.1802 13.5362L12.1412 13.5432L10.2472 12.0062L10.2222 11.9982C9.6182 10.5112 9.6182 8.86618 10.2222 7.37918L12.1412 5.83518L12.1802 5.84218C12.7202 4.36018 14.1582 3.29518 15.8512 3.29518C17.0232 3.29518 18.0452 3.72918 18.8272 4.43918L20.4812 2.79918C19.1462 1.59118 17.3992 0.864182 15.3812 0.864182C12.4202 0.864182 9.8722 2.56318 8.7212 4.95918C7.5702 7.35518 7.5702 10.1242 8.7212 12.5202C9.8722 14.9152 12.4202 16.6152 15.3812 16.6152C16.5922 16.6152 17.7642 16.2892 18.7702 15.6742L18.7762 15.6702C19.4872 15.1552 20.0212 14.4142 20.3152 13.5782H12.0002V10.2282H21.0462C21.1362 10.7972 21.1882 11.3922 21.1882 12.0002C21.1882 14.7512 19.5402 17.0552 17.6672 18.4802L17.6732 18.4842L19.8012 20.0792C18.2172 21.5362 15.9852 22.5002 13.3692 22.5002C10.0282 22.5002 7.0992 20.7082 5.5692 18.0022C4.0392 15.2972 4.0392 12.1832 5.5692 9.47818C7.0992 6.77218 10.0282 4.98018 13.3692 4.98018C15.5712 4.98018 17.5702 5.79018 19.0642 7.13218L16.8472 9.33618C16.2052 8.71518 15.3662 8.34218 14.4272 8.34218C12.9342 8.34218 11.6052 9.26118 11.0012 10.5732L10.9722 10.5782L12.7652 12.0062L12.7892 12.0142C13.3932 13.5012 13.3932 15.1462 12.7892 16.6332L11.0012 18.0842L10.9722 18.0892C11.6052 19.4012 12.9342 20.3202 14.4272 20.3202C15.6322 20.3202 16.7022 19.8702 17.4822 19.1302L17.4872 19.1262L19.1422 20.7662C17.8062 21.9742 16.0602 22.7002 14.0422 22.7002C10.9812 22.7002 8.4322 20.9992 7.2822 18.6042C6.1312 16.2082 6.1312 13.4382 7.2822 11.0422C8.4322 8.64718 10.9812 6.94618 14.0422 6.94618C15.2092 6.94618 16.2312 7.37918 17.0132 8.09018L15.3592 9.73018C14.9392 9.34818 14.3982 9.09718 13.7902 9.09718C12.4002 9.09718 11.2392 10.0862 10.7722 11.3242L10.7602 11.3232L12.0002 12.0002Z"
      fill="currentColor"
    />
  </svg>
);


export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication
    if (values.email === "admin@horizon.com" && values.password === "password") {
      if (isMounted && typeof window !== 'undefined') {
        localStorage.setItem("isLoggedInHorizonView", "true");
      }
      toast({
        title: "Login Successful",
        description: "Welcome back to Horizon View!",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
      if (isMounted && typeof window !== 'undefined') {
        localStorage.removeItem("isLoggedInHorizonView");
      }
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    // Simulate Google API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock Google authentication
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem("isLoggedInHorizonView", "true");
    }
    toast({
      title: "Google Login Successful",
      description: "Welcome to Horizon View!",
    });
    router.push("/dashboard");
    setIsGoogleLoading(false);
  };

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="text-base pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" // Changed to primary for consistency
            disabled={form.formState.isSubmitting || isGoogleLoading}
          >
            {form.formState.isSubmitting ? (
              "Signing In..."
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" /> Sign In
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={form.formState.isSubmitting || isGoogleLoading}
      >
        {isGoogleLoading ? (
          "Signing In with Google..."
        ) : (
          <>
            <GoogleIcon /> Sign in with Google
          </>
        )}
      </Button>
    </>
  );
}
