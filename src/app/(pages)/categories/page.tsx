import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryId from "./[categoryId]/page";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default async function Categories() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
    { cache: "no-store" }
  );

  const { data: categories }: { data: Category[] } = await response.json();

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Explore Categories</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
          Browse through our extensive range of categories to find exactly what you're looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link href={"/categories/" + category._id} key={category._id} className="group">
            <div className="relative h-80 w-full rounded-[2rem] overflow-hidden shadow-sm shadow-black/5 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-2">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={index < 4}
              />

              {/* Enhanced Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                <p className="text-white text-2xl font-black tracking-tight mb-2 transform group-hover:-translate-y-1 transition-transform">
                  {category.name}
                </p>
                <div className="w-0 group-hover:w-full h-1 bg-primary transition-all duration-500 rounded-full"></div>
                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Explore Collection</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
