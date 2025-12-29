'use server'
import { getUserToken } from "./getUserToken";

export async function addToWishlist(productId: string) {
    const token = await getUserToken()

    console.log(token);

    if (!token) {
        console.log('error');
        return { status: 'error', message: 'Not authenticated' }
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
    })
    const data = await res.json()
    return data
}

export async function removeFromWishlist(productId: string) {
    const token = await getUserToken()

    console.log(token);

    if (!token) {
        console.log('error');
        return { status: 'error', message: 'Not authenticated' }
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
            token: token,
        },
    })
    const data = await res.json()
    return data
}

export async function getWishlist() {
    const token = await getUserToken()

    if (!token) {
        return { status: 'error', message: 'Not authenticated', data: [] }
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        method: "GET",
        headers: {
            token: token,
        },
    })
    const data = await res.json()
    console.log('Wishlist data:', data);
    return data
}
