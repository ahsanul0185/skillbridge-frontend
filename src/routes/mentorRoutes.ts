import { Route } from "@/types";
import { LayoutDashboard, BookOpen, Users } from "lucide-react";

export const mentorRoutes: Route[] = [
  {
    title: "Mentor Tools",
    url: "#",
    icon: LayoutDashboard,
    items: [
      { title: "Overview", url: "/mentor/dashboard", icon: LayoutDashboard },
      { title: "My Assigned Courses", url: "/mentor/courses", icon: BookOpen },
      { title: "Student Rosters", url: "/mentor/rosters", icon: Users },
    ],
  },
];
