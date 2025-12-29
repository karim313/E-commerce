'use client';
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CategoryCarousel from "@/components/carousel/CategoryCarousel";

export default function Home() {
  const session = useSession();
  console.log(session);


  return (

    <div className="relative min-h-screen">
      {/* Category Carousel Section - First */}
      <div className="container mx-auto px-4 pt-4 pb-6 md:pt-6 md:pb-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-[1.1]">
            Shop the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">Future</span> <br className="hidden md:block" /> of Lifestyle.
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-base md:text-xl font-medium max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
            Experience a curated collection of premium technology, fashion, and lifestyle essentials. Quality items delivered with speed and care.
          </p>
        </div>
        <CategoryCarousel />
      </div>

      {/* Hero Section - Second */}
      <div className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden py-8 md:py-12">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 text-center z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button className="h-14 md:h-16 px-8 md:px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg shadow-2xl shadow-black/20 transition-all hover:-translate-y-1 active:scale-95">
                Explore Products
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" className="h-14 md:h-16 px-8 md:px-10 rounded-2xl font-bold text-base md:text-lg border-2 border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all active:scale-95">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section - Third */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Why Shop With Us?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto border-t border-gray-100 dark:border-zinc-800 pt-8">
          {[
            { label: "Free Shipping", sub: "On all orders", icon: "🚚" },
            { label: "Secure Pay", sub: "100% Protected", icon: "🔒" },
            { label: "24/7 Support", sub: "Always available", icon: "💬" },
            { label: "Easy Returns", sub: "30-day window", icon: "↩️" }
          ].map((item, i) => (
            <div key={i} className="text-center group p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all">
              <div className="text-3xl md:text-4xl mb-3">{item.icon}</div>
              <p className="text-gray-900 dark:text-white font-black text-base md:text-lg group-hover:text-primary transition-colors">{item.label}</p>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
