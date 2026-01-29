import * as React from "react"

import { SearchForm } from "@/components/layout/search-form"
import { VersionSwitcher } from "@/components/layout/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoutes"
import type { Route } from "@/types"
import { Role } from "@/constants/roles"
import { studentRoutes } from "@/routes/studentRoutes"
import { tutorRoutes } from "@/routes/tutorRoutes"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Write Blog",
          url: "/dashboard/write-blog",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "User dashboard",
          url: "/dashboard",
        },
        {
          title: "Admin Dashboard",
          url: "/admin-dashboard",
        },
      ],
    },
  ],
}

export function AppSidebar({user, ...props }: {user : {role : string}} & React.ComponentProps<typeof Sidebar>) {

  let routes : Route[] = [];

  switch (user.role) {
    case Role.admin:
      routes = adminRoutes;
      break;
    case Role.student:
      routes = studentRoutes;
      break;
    case Role.tutor:
      routes = tutorRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
