import { userResponse } from "@/app/_interfaces"
import NextAuth, { DefaultSession, User } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: userResponse
    token: string
  }
  interface User {
    user: userResponse
    token: string
  }
}
declare module "next-auth/jwt" {
  interface JWT extends User { }
}