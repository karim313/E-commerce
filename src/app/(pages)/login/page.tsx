"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form" // << لازم الاستيراد ده
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'

// Schema التحقق Zod
const formSchema = z.object({
  email: z.string().nonempty('email is required').email('invalid email address'),
  password: z.string().nonempty('password is required').min(6, {message: "min length at least 6 characters", }),
})

export default function Login() {
  const serchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  // إعداد الفورم مع react-hook-form + zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // عند إرسال الفورم
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const response = await signIn('credentials',{
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl:'/products'
    }
    )
    setIsLoading(false)
  }

  // JSX
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800 overflow-hidden relative">
        <div className="h-32 w-full bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="px-8 pb-10 pt-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h1>
            <p className="text-gray-500 dark:text-gray-400">Please enter your details to sign in</p>
          </div>

          {serchParams.get('error') && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-center">
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                {serchParams.get('error')}
              </span>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 ml-1">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="example@gmail.com" 
                        {...field} 
                        className="bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary transition-all"
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
                    <FormLabel className="text-gray-700 dark:text-gray-300 ml-1">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        {...field} 
                        placeholder="••••••••" 
                        className="bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700 rounded-xl focus:ring-primary focus:border-primary transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Link href="/login/verifyemail">
                <p className="text-primary hover:underline text-sm font-semibold text-right mt-2 transition-all">
                  Forgot Password?
                </p>
              </Link> 

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2" 
                disabled={isLoading}
              >
                {isLoading ? <Loader className="animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </Form> 

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-bold hover:underline transition-all">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
