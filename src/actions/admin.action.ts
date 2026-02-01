"use server"

import { categoryService } from "@/services/category.service";
import { Category, Subject } from "@/types";
import { revalidatePath, updateTag } from "next/cache";

export const createCategoryAction = async (categoryData : Partial<Category>) => {
    const res = await categoryService.createCategory(categoryData);
    updateTag("categoriesData")
    return res
}

export const updateCategoryAction = async (categoryData : Partial<Category>, categoryId : string) => {
    const res = await categoryService.updateCategory(categoryData, categoryId);
    // updateTag("categoriesData")
    revalidatePath("/admin/categories")
    return res
}

export const deleteCategoryAction = async (categoryId : string) => {
    const res = await categoryService.deleteCategory(categoryId);
    updateTag("categoriesData")
    return res
}

export const createSubjectAction = async (subjectData : Partial<Subject>) => {
    const res = await categoryService.createSubject(subjectData);
    updateTag("categoriesData")
    return res
}

export const updateSubjectAction = async (subjectData : Partial<Subject>, subjectId : string) => {
    const res = await categoryService.updateSubject(subjectData, subjectId);
    updateTag("categoriesData")
    return res
}
export const deleteSubjectAction = async (subjectId : string) => {
    const res = await categoryService.deleteSubject(subjectId);
    updateTag("categoriesData")
    return res
}