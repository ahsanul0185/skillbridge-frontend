export const dynamic = "force-dynamic";

import { AppSidebar } from "@/components/layout/app-sidebar"
import { ModeToggle } from "@/components/layout/ModeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Role } from "@/constants/roles"
import { userService } from "@/services/user.service"

export default async function DashboardLayout({admin, student, tutor} : {children : React.ReactNode, admin : React.ReactNode, student : React.ReactNode, tutor : React.ReactNode}) {

  const {data} = await userService.getSession();

  return (
    <SidebarProvider>
      <AppSidebar user={data?.user}/>
      <SidebarInset>
        <header className="flex items-center justify-between shrink-0 border-b px-4">
          <div className="flex h-16 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          </div>
          {/* <ModeToggle /> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {(data.user.role === Role.admin) ? admin : (data.user.role === Role.student) ? student : (data.user.role === Role.tutor) ? tutor : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
