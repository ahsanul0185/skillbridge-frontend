import { env } from "@/env";
import { BookingStatus } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const bookingService = {
  getAllBookings: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/bookings`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next : {
            tags : ["all-bookings"]
        }
      });

      const data = await res.json();

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Something went wrong" },
      };
    }
  },
  getBookingById: async (bookingId : string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store"
      });

      const data = await res.json();

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Something went wrong" },
      };
    }
  },
  updateBooking : async (status : BookingStatus, bookingId : string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/bookings/update/${bookingId}`, {
        method : "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body : JSON.stringify({status})
      });

      const data = await res.json();

      if (!data.success) {
        return { data, error: data.message };
      }

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Something went wrong" },
      };
    }
  },
};
