'use server'

import { getUserToken } from "@/Helpers/getUserToken"



export async function addToCartAction(productId: string) {
    const token = await getUserToken()

    if (!token) {
        return { status: 'error', message: 'User not authenticated' }
    }

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                method: 'POST',
                body: JSON.stringify({ productId }),
                headers: {
                    token: token,
                    "Content-Type": "application/json",
                }
            }
        )
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Add to cart error:', error)
        return { status: 'error', message: 'Failed to add product to cart' }
    }

}