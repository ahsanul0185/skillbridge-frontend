export type * from "./routes.type"
export type * from "./user.type"


export interface Subject {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string; 
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  subjects: Subject[];
}

export enum UserRoles {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TUTOR = "TUTOR"
}

export enum UserStatus {
    ACTIVE,
    BANNED
}
