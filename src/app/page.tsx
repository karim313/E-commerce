'use client';
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const session = useSession();
    console.log(session);
    
  
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        {session.data && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Welcome back, {session.data?.user?.name.split(" ")[0]}
          </div>
        )}

        <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-[1.1]">
          Shop the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">Future</span> <br className="hidden md:block" /> of Lifestyle.
        </h1>
        
        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          Experience a curated collection of premium technology, fashion, and lifestyle essentials. Quality items delivered with speed and care.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products">
            <Button className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-2xl shadow-black/20 transition-all hover:-translate-y-1 active:scale-95">
              Explore Products
            </Button>
          </Link>
          <Link href="/categories">
            <Button variant="outline" className="h-16 px-10 rounded-2xl font-bold text-lg border-2 border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all active:scale-95">
              Browse Categories
            </Button>
          </Link>
        </div>

        {/* Hero Features Wrap */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-gray-100 dark:border-zinc-800 pt-12">
          {[
            { label: "Free Shipping", sub: "On all orders" },
            { label: "Secure Pay", sub: "100% Protected" },
            { label: "24/7 Support", sub: "Always available" },
            { label: "Easy Returns", sub: "30-day window" }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <p className="text-gray-900 dark:text-white font-black group-hover:text-primary transition-colors">{item.label}</p>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
