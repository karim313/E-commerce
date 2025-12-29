import { FailLoginResponse, SuccessLoginResponse } from "@/app/_interfaces/login"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credential) => {
                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credential?.email,
                            password: credential?.password
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
                const payload: SuccessLoginResponse | FailLoginResponse = await res.json()
                if ('token' in payload) {
                    return {
                        id: payload.user.email,
                        user: payload.user,
                        token: payload.token
                    }
                } else {
                    throw new Error(payload.message)
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        session: ({ session, token }) => {
            session.user = token.user as any
            session.token = token.token as string
            return session
        }
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.AUTH_SECRET
}