"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, Loader, ShoppingCartIcon, UserIcon } from "lucide-react";
import { CartContext } from "../context/cartContext";
import { WishlistContext } from "../context/wishlistContext";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { cartData, isLoading: isCartLoading } = useContext(CartContext);
  const { wishlistCount, isLoading: isWishlistLoading } = useContext(WishlistContext);
  const session = useSession();
  const [istoggle, setIstoggle] = useState(false);

  return (
    <nav className="border-b border-muted text-xl font-semibold fixed z-50 top-0 inset-x-0 bg-accent/90 shadow">
      <div className="container mx-auto p-3">
        {/* Top Header */}
        <div className="flex justify-between items-center md:justify-around">
          <h1>
            <Link href="/" className="flex items-center gap-1">
              <span className="px-3 py-0.5 rounded-lg text-white bg-primary">
                S
              </span>
              ShopMart
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:w-1/2 items-center justify-between gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-3">
              {/* ACCOUNT MENU */}
              {session.status === "authenticated" && (
                <Link href='/wishlist'>
                  <div className="relative">
                    <HeartIcon className="size-5" />
                    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono absolute -top-3 -right-3 bg-rose-500 hover:bg-rose-600">
                      {isWishlistLoading ? (
                        <Loader className="size-3 animate-spin" />
                      ) : (
                        wishlistCount || 0
                      )}
                    </Badge>
                  </div>
                </Link>
              )}
               {/* CART ICON only when logged in */}
              {session.status === "authenticated" && (
                <Link href="/cart" className="mx-2">
                  <div className="relative">
                    <ShoppingCartIcon className="size-5" />
                    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono absolute -top-3 -right-3">
                      {isCartLoading ? (
                        <Loader className="size-3 animate-spin" />
                      ) : (
                        cartData?.numOfCartItems || 0
                      )}
                    </Badge>
                  </div>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <UserIcon className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {session.status === "authenticated" ? (
                    <>

                      <Link href="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>


                      <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/products" })}
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link href="/register">
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

             
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIstoggle(!istoggle)}>
            {istoggle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              "☰"
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden transition-all overflow-hidden duration-300 ${istoggle ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-3">
            <Link
              className="text-[16px]"
              href="/products"
              onClick={() => setIstoggle(false)}
            >
              Products
            </Link>
            <Link
              className="text-[16px]"
              href="/brands"
              onClick={() => setIstoggle(false)}
            >
              Brands
            </Link>
            <Link
              className="text-[16px]"
              href="/categories"
              onClick={() => setIstoggle(false)}
            >
              Categories
            </Link>

            <div className="flex items-center gap-3 border-t pt-3">
              {/* ACCOUNT MENU MOBILE */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserIcon className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {session.status === "authenticated" ? (
                    <>
                      <Link href="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem onClick={() => signOut()}>
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link href="/register">
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CART MOBILE */}
              {session.status === "authenticated" && (
                <div className="flex gap-4 items-center">
                  <Link href='/wishlist' onClick={() => setIstoggle(false)}>
                    <div className="relative">
                      <HeartIcon className="size-5" />
                      <Badge className="h-5 min-w-5 px-1 rounded-full absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600">
                        {isWishlistLoading ? (
                          <Loader className="size-3 animate-spin" />
                        ) : (
                          wishlistCount || 0
                        )}
                      </Badge>
                    </div>
                  </Link>

                  <Link href="/cart" onClick={() => setIstoggle(false)}>
                    <div className="relative">
                      <ShoppingCartIcon className="size-5" />
                      <Badge className="h-5 min-w-5 px-1 rounded-full absolute -top-2 -right-2">
                        {isCartLoading ? (
                          <Loader className="size-3 animate-spin" />
                        ) : (
                          cartData?.numOfCartItems || 0
                        )}
                      </Badge>
                    </div>
                  </Link>
                </div>

              )
              }

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
