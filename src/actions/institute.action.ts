"use server"

import { instituteService } from "@/services/institute.service";
import { revalidatePath } from "next/cache";

export const inviteMentorAction = async (email: string, name: string) => {
  const res = await instituteService.inviteMentor(email, name);
  revalidatePath("/institute/mentors");
  return res;
};
