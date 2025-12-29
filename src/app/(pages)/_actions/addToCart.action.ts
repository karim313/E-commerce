'use server'

import { getUserToken } from "@/Helpers/getUserToken"



export async function addToCartAction(productId:string){
    const token =await getUserToken()
    const response = await fetch(`${process.env.API_URL}/cart`,
            {
                method: 'POST',
                body:JSON.stringify({productId}),
                headers: {
                    token :token!,
                    "Content-Type": "application/json",
                }
            }
        )
        const data = await response.json()
        return data

}