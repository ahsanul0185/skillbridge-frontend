import type { Route } from "@/types";
import { 
  User, 
  CalendarCheck,
  LayoutDashboard,
} from "lucide-react";

export const studentRoutes: Route[] = [
  {
    title: "Student Dashboard",
    url: "#",
    icon: User,
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "My Profile", url: "/dashboard/profile", icon: User },
      { title: "My Bookings", url: "/dashboard/bookings", icon: CalendarCheck }
    ],
  },
];