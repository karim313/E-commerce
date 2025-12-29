"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

const formSchema = z.object({
  resetCode: z
    .string()
    .regex(/^\d{6}$/, "Code must be exactly 6 digits"),
});

type VerifyCodeForm = z.infer<typeof formSchema>;

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyCodeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function onSubmit(values: VerifyCodeForm) {
    setIsLoading(true);
   const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "Success") {
        toast.success("Code verified successfully");
        router.push("/login/verifyemail/resetpassword");
      } else {
        toast.error(data.message || "Invalid or expired code");
      }
      setIsLoading(false);
  }

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800 overflow-hidden relative">
        <div className="h-32 w-full bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="absolute top-4 left-4">
            <Link href="/login/verifyemail">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>

        <div className="px-8 pb-10 pt-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Verify Email</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter the 6-digit code sent to your inbox</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 ml-1 text-center block w-full mb-4">Verification Code</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <Input
                          {...field}
                          inputMode="numeric"
                          placeholder="000000"
                          maxLength={6}
                          className="pl-12 h-14 text-2xl text-center tracking-[0.5em] font-bold bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary transition-all"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify code"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
