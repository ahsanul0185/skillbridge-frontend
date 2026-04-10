import { User } from "./user.type";
import { Category } from "./index";

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl?: string | null;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration?: string | null;
  categoryId?: string | null;
  instituteId: string;
  mentorIds?: string[] | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  mentors?: {
    id: string;
    user: {
        name: string;
        image: string | null;
    }
  }[];
  category?: Category | null;
  institute?: {
    id: string;
    name: string;
  };
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  course: Course;
  student: User;
}
