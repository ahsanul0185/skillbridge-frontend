"use server"

import { userService } from "@/services/user.service";
import { User, UserProfileFormProps } from "@/types"
import { revalidatePath } from "next/cache";

export const updateProfileAction = async (updatedData : Partial<User>) => {
    const res = await userService.updateProfile(updatedData);
    revalidatePath  ("/profile");
    return res
}