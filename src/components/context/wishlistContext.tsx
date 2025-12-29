'use client'
import { createContext, useEffect, useMemo, useState, useContext } from "react";
import { getWishlist } from "@/Helpers/favourite";
import { useSession } from "next-auth/react";

interface WishlistContextType {
    wishlistIds: string[];
    wishlistCount: number;
    isLoading: boolean;
    getWishlistData: () => Promise<void>;
    setWishlistIds: (ids: string[]) => void;
}

export const WishlistContext = createContext<WishlistContextType>({
    wishlistIds: [],
    wishlistCount: 0,
    isLoading: false,
    getWishlistData: async () => { },
    setWishlistIds: () => { },
});

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getWishlistData = async () => {
        if (!session?.token) return;
        try {
            setIsLoading(true);
            const res = await getWishlist();
            if (res.status === "success") {
                const ids = res.data.map((item: any) => item._id);
                setWishlistIds(ids);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (session?.token) {
            getWishlistData();
        } else {
            setWishlistIds([]);
        }
    }, [session?.token]);

    const contextValue = useMemo(() => ({
        wishlistIds,
        wishlistCount: wishlistIds.length,
        isLoading,
        getWishlistData,
        setWishlistIds
    }), [wishlistIds, isLoading]);

    return (
        <WishlistContext.Provider value={contextValue}>
            {children}
        </WishlistContext.Provider>
    );
}
