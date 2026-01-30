import { Route } from "@/types";
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  ShieldAlert,
  ClipboardList,
} from "lucide-react";

export const adminRoutes: Route[] = [
  {
    title: "Platform Management",
    url: "#",
    icon: ShieldAlert,
    items: [
      { title: "Analytics", url: "/admin/analytics", icon: LayoutDashboard },
      { title: "User Management", url: "/admin/users", icon: Users },
      { title: "All Bookings", url: "/admin/bookings", icon: ClipboardList },
      { title: "Category & Subjects", url: "/admin/categories", icon: Layers },
    ],
  },
];