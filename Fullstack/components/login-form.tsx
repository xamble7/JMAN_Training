"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/definititons";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await signIn("credentials", {
        redirect: false, // Do not redirect after login
        email: data.email,
        password: data.password,
      });
      if (!response?.ok) {
        toast({
          title: "Login Failed",
          description: "Invalid Email and Password",
          variant: "destructive",
        });
        return;
      }
      if (session?.user?.role !== "admin") {
        toast({
          title: "Access Denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
        return;
      }

      // If the user is an admin, redirect to the dashboard
      toast({
        title: "Login Successful",
        description: "Welcome back, admin!",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login Failed:", error);
      toast({
        title: "Login Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full p-2 relative flex flex-col gap-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Login</Button>
        </form>
      </Form>
      {/* <Link
        href={"/auth/signup"}
        className="text-center font-thin text-gray-900 ml-auto"
      >
        New User? Signup
      </Link> */}
    </>
  );
};

export default Login;
