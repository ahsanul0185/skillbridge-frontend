import { env } from "@/env";
import { TutorFilterParams } from "@/types";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const tutorService = {
  getAllTutors: async (params: TutorFilterParams, options?: ServiceOptions) => {
    try {
      const url = new URL(`${API_URL}/api/tutors`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["tutorsList"] };

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Something went wrong" },
      };
    }
  },
};
