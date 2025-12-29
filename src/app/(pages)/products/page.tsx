
import { ProductI } from "@/app/_interfaces/productI";
import IsLoading from "@/app/loading";
import AddToCart from "@/components/addToCart/addToCart";
import MyHeartIcon from "@/components/myhearticon/hearticon";
import StarsIcon from "@/components/StarsIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToWishlist } from "@/Helpers/favourite";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Products() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  let { data: products }: { data: ProductI[] } = await res.json();



  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Featured Products</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
          Discover our curated selection of high-quality products from the world's leading brands.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div key={product.id} className="group relative">
            <Card className="h-full flex flex-col p-4 rounded-3xl border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white dark:bg-zinc-900/50">
              <Link href={'/products/' + product.id} className="flex-grow">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-800 mb-4">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    priority={index < 4}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                      {product.brand.name}
                    </span>
                  </div>
                </div>

                <div className="px-1 space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4].map((i) => (
                        <StarsIcon key={i} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400">{product.ratingsAverage}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-tighter">Price</span>
                      <span className="text-xl font-black text-gray-900 dark:text-white">
                        {product.price} <span className="text-sm font-medium">EGP</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="mt-6 flex items-center gap-2 px-1">
                <AddToCart productId={product._id} />
                <MyHeartIcon productId={product._id} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}