export const dynamic = "force-dynamic";
import { env } from "@/env";
import { User, UserProfileFormProps } from "@/types";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
    getSession : async function () {
        try {
        const cookieStore = await cookies();

        const res = await fetch(`${AUTH_URL}/get-session`, {
            headers : {
                Cookie : cookieStore.toString()
            },
            cache : "no-store"
        });

        const session = await res.json();

        if (session === null) {
            return {data : null, error  : {message : "Session in missing"}}
        }

        return {data : session, error : null}
        } catch (error) {
            console.log(error)
            return {data : null, error : {message : "Something went wrong"}}
        }
    },
    getProfile : async function () {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/user/me`, {
                headers : {
                    Cookie : cookieStore.toString()
                },
                cache : "no-store"
            });
            const data = await res.json()

        return {data, error : null}
        } catch (error) {
            console.log(error)
            return {data : null, error : {message : "Something went wrong"}}
        }
    },
    updateProfile : async function (updatedData : Partial<User>) {
        try {
        
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/user/update`, {
                method : "PUT",
                headers : {
                    Cookie : cookieStore.toString(),
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(updatedData)
            });
            const data = await res.json()

            console.log(data)

        return {data, error : null}
        } catch (error) {
            console.log(error)
            return {data : null, error : {message : "Something went wrong"}}
        }
    },
}