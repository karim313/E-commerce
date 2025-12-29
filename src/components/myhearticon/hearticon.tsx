"use client";

import { addToWishlist, removeFromWishlist } from "@/Helpers/favourite";
import { HeartIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { WishlistContext } from "../context/wishlistContext";

export default function MyHeartIcon({ productId }: { productId: string }) {
  const [btnLoading, setBtnLoading] = useState(false);
  const { wishlistIds, setWishlistIds } = useContext(WishlistContext);
  const router = useRouter();

  async function handleClick() {
    if (btnLoading) return;

    try {
      setBtnLoading(true);

      // Check if already in wishlist
      if (wishlistIds.includes(productId)) {
        // REMOVE from wishlist
        const removeFav = await removeFromWishlist(productId);
        if (removeFav?.status === "success") {
          toast.success("Removed from wishlist ");
          setWishlistIds(wishlistIds.filter((id) => id !== productId));
        } else {
          toast.error(removeFav?.message || "Failed to remove");
        }
      } else {
        // ADD to wishlist
        const result = await addToWishlist(productId);
        if (result?.status === "success") {
          toast.success("Added to wishlist ");
          setWishlistIds([...wishlistIds, productId]);
        } else {
          toast.error(result?.message || "Failed to add");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  }

  const isLiked = wishlistIds.includes(productId);

  return (
    <button
      onClick={handleClick}
      disabled={btnLoading}
      className={`h-11 w-11 flex items-center justify-center rounded-xl border transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isLiked
        ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-500"
        : "border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 group"
        }`}
    >
      <HeartIcon
        className={`w-5 h-5 transition-all ${isLiked ? "fill-rose-500 text-rose-500" : "group-hover:fill-rose-500"
          } ${btnLoading ? "animate-pulse" : ""}`}
      />
    </button>
  );
}
