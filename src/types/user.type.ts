import { Category } from "."

export interface User {
  id: string
  name: string
  email: string
  emailVerified?: boolean
  image?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  role: UserRoles
  status?: UserStatus
}

export enum UserRoles {
    ADMIN,
    TUTOR,
    STUDENT
}
export enum UserStatus {
    ACTIVE,
    BANNED
}


export interface TutorFilterParams {
  search?: string | null;
  hourlyRate?: number | null;
  categoryId?: string | null;
  isFeatured?: boolean | null;
  avgRating?: number | null;
  totalReviews?: number | null;
  subjectId?: string | null;
  page?: string;
  limit?: string;
}



export interface Availability {
  id: string;
  tutorId: string;
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  startTime: string; // e.g., "19:00"
  endTime: string;   // e.g., "20:00"
  status: "AVAILABLE" | "BOOKED";
}

export interface TutorProfile {
  id: string;
  userId: string;
  bio: string;
  hourlyRate: number;
  categoryId: string;
  isFeatured: boolean;
  avgRating: string;
  totalReviews: number;
  createdAt: string;
  user: User;
  availability: Availability[];
  category : Category;
  _count: {
    reviews: number;
  };
}