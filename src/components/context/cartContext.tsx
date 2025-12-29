'use client'
import { CartProductI } from "@/app/_interfaces";
import { createContext, useEffect, useMemo, useState } from "react";
export const CartContext = createContext<{
    cartData: null | CartProductI,
    setCartData: (value: CartProductI | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getCart: () => void
}>({
    cartData: null,
    setCartData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart: () => { }
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [cartData, setCartData] = useState<CartProductI | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    async function getCart() {
        try {
            setIsLoading(true)
            const res = await fetch('/api/get-cart')
            if (res.ok) {
                const data: CartProductI = await res.json()
                setCartData(data)
            }
        } catch (error) {
            console.error("Error fetching cart:", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getCart()
    }, [])

    const contextValue = useMemo(() => ({
        cartData,
        setCartData,
        isLoading,
        setIsLoading,
        getCart
    }), [cartData, isLoading])


    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )

}