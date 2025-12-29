import { ProductI } from "@/app/_interfaces";
import CardProduct from "@/components/cardProduct/cardProduct";
import { Params } from "next/dist/server/request/params";
import React from "react";

export default async function CategoryId({ params }: { params: Params }) {
  const { categoryId } = await params;

  // Get all products
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    { cache: "no-store" }
  );
  const { data: products }: { data: ProductI[] } = await res.json();

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category._id === categoryId
  );

  // Get category name
  const categoryRes = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories/" + categoryId,
    { cache: "no-store" }
  );
  const { data: category }: { data: { name: string } } =
    await categoryRes.json();

  return (
    <div className="container w-[90%] mx-auto py-6">
      <h1 className="text-3xl font-bold mb-1 lg:w-11/12 mx-auto">
        {category.name}
      </h1>

      <p className="text-gray-400 mb-6 lg:w-11/12 mx-auto">
        Products from this category
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:w-11/12 mx-auto">
        {categoryProducts.length > 0 ? (
          <CardProduct products={categoryProducts} />
        ) : (
          <p className="text-center col-span-4 min-h-[60vh] flex items-center justify-center text-gray-500">
            No products found for this category.
          </p>
        )}
      </div>
    </div>
  );
}
