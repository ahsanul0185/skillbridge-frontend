import type { Route } from "@/types";

 export const adminRoutes : Route[] = [
    {
      title: "User Management",
      url: "#",
      items: [
        {
          title: "Analytics",
          url: "/analytics",
        },
        {
          title: "Banned Users",
          url: "/banned-users",
        }
      ],
    },
  ]