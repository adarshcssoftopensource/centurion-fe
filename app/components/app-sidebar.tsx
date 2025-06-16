import * as React from "react";
import {
  AdminDashboardIcon,
  LogManagementIcon,
  LogoutIcon,
  NotificationsIcon,
  SecuritySettingsIcon,
  UserManagementIcon,
} from "~/assets/icons";
import Logo from "~/assets/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "~/components/ui/sidebar";

const data = [
  {
    title: "Admin Dashboard",
    icon: <AdminDashboardIcon />,
    url: "/admin/user-management",
  },
  {
    title: "User Management",
    icon: <UserManagementIcon />,
    url: "/admin/user-management",
  },
  {
    title: "Security Settings",
    icon: <SecuritySettingsIcon />,
    url: "/admin/user-management",
  },
  {
    title: "Log Management",
    icon: <LogManagementIcon />,
    url: "/admin/user-management",
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="m-1.75 border-none rounded-2xl overflow-hidden p-5 pb-4"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="mb-8">
        <SidebarMenu className="flex flex-row justify-between items-center">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="gap-4 px-0 hover:bg-transparent"
            >
              <img src={Logo} alt="Logo" className="size-10" />
              <div className="leading-tight text-[20px] font-medium">
                Centurion <br /> Licensing
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarTrigger />
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="flex flex-col gap-1">
        <SidebarMenu>
          {data.map((item, index) => (
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={index === 0}
                tooltip={item.title}
                className="py-7 px-3"
              >
                <span className="size-5">{item.icon}</span>
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-auto pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="justify-start">
              <NotificationsIcon />
              Notifications
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="justify-start">
              <LogoutIcon />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
