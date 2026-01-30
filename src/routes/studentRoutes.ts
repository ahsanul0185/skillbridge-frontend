import type { Route } from "@/types";
import { 
  User, 
  CalendarCheck,
  Star
} from "lucide-react";

export const studentRoutes: Route[] = [
  {
    title: "Student Dashboard",
    url: "#",
    icon: User,
    items: [
      { title: "My Profile", url: "/dashboard/profile", icon: User },
      { title: "My Bookings", url: "/dashboard/bookings", icon: CalendarCheck },
      { title: "Reviews", url: "/dashboard/reviews", icon: Star },
    ],
  },
];