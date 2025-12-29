import { ProductI } from "@/app/_interfaces/productI";
import CardProduct from "@/components/cardProduct/cardProduct";
import React from "react";

interface RelatedProductsProps {
    currentProduct: ProductI;
}

export default async function RelatedProducts({
    currentProduct,
}: RelatedProductsProps) {
    // Fetch all products from the same category
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?category=${currentProduct.category._id}`,
        { cache: "no-store" }
    );
    const { data: categoryProducts }: { data: ProductI[] } = await res.json();

    const minPrice = currentProduct.price * 0.8;
    const maxPrice = currentProduct.price * 1.2;
    const relatedProducts = categoryProducts
        .filter((product) => product.id !== currentProduct.id)
        .filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
        )
        .slice(0, 8); // Limit to 8 products

    // If no related products found, return null
    if (relatedProducts.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Related Products
                </h2>
                <p className="text-gray-600">
                    Products in the same category with similar price range
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <CardProduct products={relatedProducts} />
            </div>
        </div>
    );
}
