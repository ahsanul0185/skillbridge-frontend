import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const mentorService = {
  getAssignedCourses: async function (params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/courses/assigned`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value as string);
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: { Cookie: cookieStore.toString() },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getCourseRoster: async function (courseId: string, params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/courses/roster/${courseId}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value as string);
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: { Cookie: cookieStore.toString() },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
