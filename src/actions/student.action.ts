"use server"

import { tutorService } from "@/services/tutor.service";

export const getTutorByIdAction = async (tutorId : string) => {
    const res = await tutorService.getTutorById(tutorId);
    return res
}
