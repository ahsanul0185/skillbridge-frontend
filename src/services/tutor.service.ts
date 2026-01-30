import { env } from "@/env";


const API_URL = env.API_URL;

export const tutorService = {
    getAllTutors : async () => {
        try {
            const url = new URL(`${API_URL}/api/tutors`);

            const res = await fetch(url.toString());
            const data = await res.json();

            return {data, error : null}

        } catch (error : any) {
            return {data : null, error : {message : error?.message || "Something went wrong"}}
        }
    }
};