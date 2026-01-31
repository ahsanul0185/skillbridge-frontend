"use server"

import { tutorService } from "@/services/tutor.service";
import { TutorProfileDashboard } from "@/types";
import { revalidatePath } from "next/cache";

export const updateTutorProfileAction = async (updatedData : Partial<TutorProfileDashboard>, subjectIds : string[]) => {
    const res = await tutorService.updateTutorData(updatedData, subjectIds);
    revalidatePath  ("/profile");
    return res
}