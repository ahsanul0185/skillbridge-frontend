"use server"

import { courseService } from "@/services/course.service";
import { revalidatePath } from "next/cache";

export const createCourseAction = async (courseData: {
  title: string;
  description: string;
  price: number;
  status: string;
  mentorIds: string[];
  level: string;
  duration?: string;
  thumbnailUrl?: string;
  categoryId?: string;
}) => {
  const { status, ...rest } = courseData;
  const isPublished = status === "PUBLISHED";
  const res = await courseService.createCourse({ ...rest, isPublished });
  revalidatePath("/institute/courses");
  return res;
};

export const updateCourseAction = async (courseId: string, courseData: {
  title: string;
  description: string;
  price: number;
  status: string;
  mentorIds: string[];
  level: string;
  duration?: string;
  thumbnailUrl?: string;
  categoryId?: string;
}) => {
  const { status, ...rest } = courseData;
  const isPublished = status === "PUBLISHED";
  const res = await courseService.updateCourse(courseId, { ...rest, isPublished });
  revalidatePath("/institute/courses");
  return res;
};

export const deleteCourseAction = async (courseId: string) => {
  const res = await courseService.deleteCourse(courseId);
  revalidatePath("/institute/courses");
  return res;
};
