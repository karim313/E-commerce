"use client";

import { useState, useEffect } from "react";
import { CategoryI } from "@/app/_interfaces/categoryI";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryCarousel() {
    const [categories, setCategories] = useState<CategoryI[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
                const { data }: { data: CategoryI[] } = await res.json();
                setCategories(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, []);

    // Auto-play functionality - change slide every 2 seconds
    useEffect(() => {
        if (!isAutoPlaying || categories.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % categories.length);
        }, 2000); // 2 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, categories.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        // Resume auto-play after 5 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
        goToSlide(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % categories.length;
        goToSlide(newIndex);
    };

    if (isLoading) {
        return (
            <div className="w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl animate-pulse" />
        );
    }

    if (categories.length === 0) return null;

    return (
        <div className="relative w-full group">
            {/* Main Carousel Container */}
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Slides */}
                {categories.map((category, index) => (
                    <Link
                        key={category._id}
                        href={`/categories/${category._id}`}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                                ? "opacity-100 scale-100 z-10"
                                : "opacity-0 scale-95 z-0"
                            }`}
                    >
                        {/* Background Image with Overlay */}
                        <div className="relative w-full h-full">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
                                <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                            <div className="max-w-4xl">
                                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4">
                                    <span className="text-white/90 text-sm font-semibold uppercase tracking-widest">
                                        Category {index + 1} of {categories.length}
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                                    {category.name}
                                </h2>
                                <p className="text-white/80 text-lg md:text-xl font-medium mb-6">
                                    Explore our curated collection
                                </p>
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
                                    Shop Now
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToPrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
                {categories.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all ${index === currentIndex
                                ? "w-8 h-2 bg-primary rounded-full"
                                : "w-2 h-2 bg-gray-300 dark:bg-zinc-700 rounded-full hover:bg-primary/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="absolute top-4 right-4 z-30">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-semibold hover:bg-white/20 transition-all"
                >
                    {isAutoPlaying ? "⏸ Pause" : "▶ Play"}
                </button>
            </div>
        </div>
    );
}
