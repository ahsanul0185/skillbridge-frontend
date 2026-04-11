import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const paymentService = {
  createBookingPaymentSession: async (bookingId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/payments/booking/${bookingId}`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await res.json();

      if (!data.success) {
        return { data: null, error: data.message };
      }

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error?.message || "Failed to create payment session",
      };
    }
  },

  createCoursePaymentSession: async (courseId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/payments/course/${courseId}`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await res.json();

      if (!data.success) {
        return { data: null, error: data.message };
      }

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error?.message || "Failed to create payment session",
      };
    }
  },

  getMyPayments: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/payments/me`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: {
          tags: ["payment-history"],
        },
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

  verifyPaymentSession: async (sessionId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/payments/verify/${sessionId}`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error?.message || "Verification failed" };
    }
  },

  getTutorPayments: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/payments/tutor`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
        next: { tags: ["tutor-payments"] },
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error?.message || "Failed to load tutor payments" } };
    }
  },
};
