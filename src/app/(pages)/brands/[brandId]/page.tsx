import React from 'react'
import { Params } from 'next/dist/server/request/params'
import { ProductI } from '@/app/_interfaces';
import CardProduct from '@/components/cardProduct/cardProduct';

export default async function BrandId({ params }: { params: Params }) {
    const { brandId } = await params;
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
     let { data: products }: { data: ProductI[] } = await res.json();
     const brandProducts = products.filter(product => product.brand._id === brandId);
     async function getBrandName() {
      const brandNameRes = await fetch("https://ecommerce.routemisr.com/api/v1/brands/"+brandId);
      const { data: brand }: { data: { name: string } } = await brandNameRes.json();
      return brand.name;
     }
     const brandName = await getBrandName();
    console.log(brandProducts);
    
  return <>
          <div className="container w-[90%] mx-auto py-4">
  <h1 className="text-3xl font-bold  lg:w-11/12 mx-auto">
    {brandProducts.length > 0
      ? brandProducts[0].brand.name
      : brandName}
  </h1>
      <p className='text-gray-400 mb-4 w-[90%] mx-auto'>Products from this brand</p>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full mx-auto lg:w-11/12">
    {brandProducts.length > 0 ? (
      <CardProduct products={brandProducts} />
    ) : (
      <p className="text-center col-span-4 min-h-[75vh] flex items-center justify-center">
        No products found for this brand.
      </p>
    )}
  </div>
</div>

  </>
}

