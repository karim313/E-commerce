import { getWishlist, removeFromWishlist } from "@/Helpers/favourite";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StarsIcon from "@/components/StarsIcon";
import AddToCart from "@/components/addToCart/addToCart";
import MyHeartIcon from "@/components/myhearticon/hearticon";
import { WishlistProduct } from "@/app/_interfaces/wishlistI";



export default async function WishlistPage() {
  const wishlistData = await getWishlist();
  const products: WishlistProduct[] = wishlistData?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <HeartIcon className="w-8 h-8 text-rose-500 fill-rose-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              My Wishlist
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {products.length > 0
              ? `You have ${products.length} ${products.length === 1 ? 'item' : 'items'} in your wishlist`
              : 'Your wishlist is empty'}
          </p>
        </div>

        {/* Wishlist Items */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 mb-6 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
              <HeartIcon className="w-16 h-16 text-rose-300 dark:text-rose-700" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding products you love!
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={product._id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-zinc-900"
              >
                <Link href={`/products/${product._id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={index < 4}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category.name}
                    </div>
                  </div>
                </Link>

                <CardContent className="p-4">
                  <Link href={`/products/${product._id}`}>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <StarsIcon />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {product.ratingsAverage}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex gap-2">
                  <AddToCart productId={product._id} />
                  <MyHeartIcon productId={product._id} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}