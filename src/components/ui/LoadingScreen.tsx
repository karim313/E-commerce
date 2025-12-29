'use client'

import React from 'react'
import { ShoppingBag } from 'lucide-react'

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-500">
            <div className="relative">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                
                {/* Gradient Ring Spinner */}
                <div className="relative w-24 h-24 rounded-full border-4 border-zinc-100 dark:border-zinc-800 p-1 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite] opacity-50">
                         <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary to-transparent blur-sm"></div>
                    </div>
                    
                    {/* Inner Icon */}
                    <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-2xl z-10 border border-zinc-100 dark:border-zinc-800">
                        <ShoppingBag className="w-8 h-8 text-primary animate-bounce-subtle" />
                    </div>
                </div>
            </div>
            
            {/* Loading Text */}
            <div className="mt-8 flex flex-col items-center">
                <h2 className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100 uppercase">
                    ShopMart
                </h2>
                <div className="flex gap-1 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-[bounce_1s_infinite_0ms]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-[bounce_1s_infinite_200ms]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_400ms]"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}
