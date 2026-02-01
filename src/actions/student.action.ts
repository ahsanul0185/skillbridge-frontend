"use server"

import { bookingService } from "@/services/booking.service";
import { tutorService } from "@/services/tutor.service";
import { CreateBookingPayload } from "@/types";

export const getTutorByIdAction = async (tutorId : string) => {
    const res = await tutorService.getTutorById(tutorId);
    return res
}
export const createBookingAction = async (data : CreateBookingPayload) => {
    const res = await bookingService.createBooking(data);
    return res
}
