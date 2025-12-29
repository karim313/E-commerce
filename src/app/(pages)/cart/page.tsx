"use client";
import IsLoading from "@/app/loading";
import CheckOut from "@/components/checkOut/CheckOut";
import { CartContext } from "@/components/context/cartContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clearCart } from "@/Helpers/clearCart";

export default function Cart() {
  const { data: session } = useSession();
  const token = session?.token;
  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  const [isRemovingProductId, setIsRemovingProductId] = useState<string | null>(
    null
  );
  const [isClear, setIsClear] = useState<Boolean | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  useEffect(() => {
    if (
      typeof cartData?.data?.products?.[0]?.product === "string" ||
      cartData === null
    ) {
      getCart();
    }
  }, [cartData]);


  async function removeItem(itemId: string) {
    setIsRemovingProductId(itemId);
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + itemId,
      {
        method: "DELETE",
        headers: {
          token: token || "",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (data.status == "success") {
      toast.success("Item removed from cart");
      setCartData(data);
    }
    setIsRemovingProductId(null);
  }

  async function updateItem(updatingId: string, count: number) {
    setUpdatingId(updatingId);
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + updatingId,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token: token || "",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.status == "success") {
      toast.success("Item updated");
      setCartData(data);
    }
    setUpdatingId(null);
  }

  async function handleClearCart() {
    if (!token) {
      toast.error("Please login to clear your cart");
      return;
    }

    setIsClear(true);
    const success = await clearCart(token, setCartData);
    toast.success('Cart cleared successfully');
    setIsClear(false);
  }

  return (
    <>
      {isLoading || typeof cartData?.data?.products[0]?.product == "string" ? (
        <IsLoading />
      ) : cartData?.numOfCartItems! > 0 ? (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Shopping Cart</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              {cartData?.numOfCartItems} items reserved for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 space-y-6">
              {cartData?.data?.products.map((item, index) => (
                <div
                  key={item.product.id}
                  className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative w-full sm:w-40 h-40 bg-gray-50 dark:bg-zinc-800 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.imageCover || ""}
                        alt={item.product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 160px"
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        priority={index < 3}
                      />
                    </div>

                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                            {item.product.title}
                          </h2>
                          <div className="text-right">
                            <p className="text-xl font-black text-primary">EGP {item.price}</p>
                            <p className="text-xs text-gray-400 font-medium">per unit</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 font-medium mb-4">
                          {item.product.brand.name} • {item.product.subcategory[0].name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center bg-gray-100 dark:bg-zinc-800/80 rounded-xl p-1 border border-gray-200 dark:border-zinc-700">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-zinc-700 shadow-none"
                            disabled={item.count == 1}
                            onClick={() => updateItem(item.product._id, item.count - 1)}
                          >
                            -
                          </Button>
                          <span className="w-10 text-center font-bold text-sm">
                            {updatingId == item.product._id ? (
                              <Spinner className="size-4 mx-auto" />
                            ) : (
                              item.count
                            )}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-zinc-700 shadow-none"
                            onClick={() => updateItem(item.product._id, item.count + 1)}
                          >
                            +
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-bold flex items-center gap-2 rounded-xl transition-all"
                          onClick={() => removeItem(item.product._id)}
                          loading={isRemovingProductId === item.product._id}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-bold">EGP {cartData?.data.totalCartPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Shipping</span>
                    <span className="text-green-500 font-bold uppercase text-xs tracking-wider bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">Free</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-black text-primary">EGP {cartData?.data.totalCartPrice}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <CheckOut cartId={cartData?.cartId || ""} />
                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Clear Cart Button */}
                <button
                  onClick={handleClearCart}
                  className="w-full mt-6 py-2 text-xs font-bold text-gray-400 hover:text-red-500 flex items-center justify-center gap-2 transition-colors uppercase tracking-widest disabled:opacity-50"
                  disabled={!!isClear}
                >
                  {isClear ? <Spinner className="size-3" /> : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  )}
                  Clear Entire Cart
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-zinc-800/10 p-6 rounded-3xl border border-gray-100/50 dark:border-zinc-800/20">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  By completing your purchase you agree to ShopMart's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md text-center space-y-8">
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-primary/20 rounded-full animate-ping"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Your cart is empty</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xs mx-auto">
                Ready to find some great deals? Start exploring our collection now!
              </p>
            </div>
            <Link href="/products" className="block">
              <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/30 transition-all text-lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
