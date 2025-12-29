import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getUserToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('next-auth.session-token')?.value ||
        cookieStore.get('__Secure-next-auth.session-token')?.value;

    if (!token) return null;

    const accessToken = await decode({
        token: token,
        secret: process.env.AUTH_SECRET!
    })
    return accessToken?.token;
}