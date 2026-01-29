import type { Route } from "@/types";

 export const studentRoutes : Route [] = [
    {
      title: "Student",
      url: "#",
      items: [
        {
          title: "My profile",
          url: "/dashboard/profile",
        },
        {
          title: "Bookings",
          url: "/dashboard/bookings",
        }
      ],
    },
  ]