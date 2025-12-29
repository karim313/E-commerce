
import { getUserToken } from "./getUserToken";
import { OrderI } from "@/app/_interfaces/orderI";

export async function getUserOrders(): Promise<OrderI[]> {
    const token = await getUserToken();
    if (!token) return [];

    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
        const userId = decodedPayload.id;

        if (!userId) {
            console.warn("No user ID found in token");
            return [];
        }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
            headers: {
                "token": token
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            return [];
        }

        const data = await res.json();

        // If the API wraps the orders in a 'data' property, return that.
        // Otherwise return the data directly.
        const orders = Array.isArray(data) ? data : data.data || [];

        console.log(`Fetched ${orders.length} orders for user: ${userId}`);
        return orders;
    } catch (error) {
        console.error("Error getting user orders:", error);
        return [];
    }
}
