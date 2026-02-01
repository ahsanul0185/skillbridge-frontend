"use server"

import { bookingService } from "@/services/booking.service";
import { userService } from "@/services/user.service";
import { BookingStatus, User, UserProfileFormProps } from "@/types"
import { revalidatePath, updateTag } from "next/cache";

export const updateProfileAction = async (updatedData : Partial<User>) => {
    const res = await userService.updateProfile(updatedData);
    revalidatePath  ("/profile");
    return res
}
export const updateBookingStatusAction = async (status : BookingStatus, bookingId : string) => {
    const res = await bookingService.updateBooking(status, bookingId);
    updateTag("all-bookings")
    return res
}