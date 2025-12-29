"use client";
import React, { useState } from "react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { POST } from "@/app/api/sign-up/route";
import toast from "react-hot-toast";
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  rePassword: z.string(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(15, { message: "Phone number must be at most 15 digits." }),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export default function Register() {
  const [isloading, setIsLoading] = useState(false)
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const response = await fetch('/api/sign-up', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const data = await response.json()
    console.log(data);

    if (data.message === "success") {
      router.push("/login")
      toast.success("registration successful! please login.")
    }
    setIsLoading(false)

  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800 overflow-hidden relative">
        <div className="h-32 w-full bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="px-8 pb-10 pt-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Join ShopMart and start shopping today</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 ml-1">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 ml-1">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="01000000000" {...field} className="bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 ml-1">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} className="bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary transition-all" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 ml-1">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 ml-1">Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} className="bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 mt-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                disabled={isloading}
              >
                {isloading ? <Spinner className="mr-1" /> : "Create Account"}
              </Button>
            </form>
          </Form>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
