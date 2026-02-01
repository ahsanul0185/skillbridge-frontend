// interface Availability {
//   id: string;
//   tutorId: string;
//   day: string;
//   startTime: string;
//   endTime: string;
//   status: "AVAILABLE" | "BOOKED";
// }

import { Category } from ".";
import { Availability, TutorSubject, User } from "./user.type";

// interface Category {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
// }

// interface Subject {
//   id: string;
//   name: string;
//   categoryId: string;
//   createdAt: string;
// }

// interface TutorSubject {
//   tutorId: string;
//   subjectId: string;
//   subject: Subject;
// }

interface Review {
  id: string;
  tutorId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// interface TutorUser {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   image: string;
//   role: "TUTOR";
//   status: "ACTIVE" | "INACTIVE";
//   emailVerified: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

export interface TutorForModal {
  id: string;
  userId: string;
  user: User;
  categoryId: string;
  category: Category;
  bio: string;
  hourlyRate: number;
  avgRating: string;
  totalReviews: number;
  isFeatured: boolean;
  subjects: TutorSubject[];
  availability: Availability[];
  reviews: Review[];
  createdAt: string;
}