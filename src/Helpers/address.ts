
import { AddressResponse } from "@/app/_interfaces/addressI";
import { getUserToken } from "./getUserToken";

export async function addAddress(address: { name: string; details: string; phone: string; city: string }, token: string) {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
    });
    const data = await res.json();
    return data;
}

export async function removeAddress(addressId: string, token: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
            token: token,
        },
    });
    const data = await res.json();
    return data;
}

export async function getAddresses(token: string) {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
        method: "GET",
        headers: {
            token: token,
        },
    });
    const data: AddressResponse = await res.json();
    return data;
}
