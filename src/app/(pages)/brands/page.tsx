import { BrandI } from '@/app/_interfaces'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Brands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
  const { data: brands }: { data: BrandI[] } = await response.json()
  console.log(brands)

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Our Partners</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
          We collaborate with the most prestigious brands to bring you the highest quality products in the market.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {brands.map((brand, index) => (
          <Link key={brand._id} href={'/brands/' + brand._id} className="group">
            <Card className="flex flex-col items-center justify-center p-8 rounded-3xl border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-zinc-900/50 group-hover:-translate-y-2">
              <div className="relative w-full aspect-video mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain"
                  priority={index < 4}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-200 group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
