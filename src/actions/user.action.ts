"use server"

import { userService } from "@/services/user.service";
import { User, UserProfileFormProps } from "@/types"

export const updateProfileAction = async (updatedData : Partial<User>) => {
    const res = await userService.updateProfile(updatedData);
    return res
}