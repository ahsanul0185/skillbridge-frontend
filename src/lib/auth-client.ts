import { env } from "@/env"
import { createAuthClient } from "better-auth/react"
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: env.NEXT_PUBLIC_BACKEND,
    fetchOptions : {
        credentials : "include",
    },
    plugins : [
        nextCookies()
    ]
})