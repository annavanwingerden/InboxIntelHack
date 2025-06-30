import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Users,
  BarChart3,
  Settings,
  Send,
  Target
} from "lucide-react";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Campaigns", url: "/campaigns", icon: Target },
  { title: "Contacts", url: "/contacts", icon: Users, comingSoon: true },
  { title: "Outbox", url: "/outbox", icon: Send, comingSoon: true },
  { title: "Inbox", url: "/inbox", icon: Mail, comingSoon: true },
  { title: "Analytics", url: "/analytics", icon: BarChart3, comingSoon: true },
  { title: "Settings", url: "/settings", icon: Settings, comingSoon: true },
];

export function Sidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600" 
      : "hover:bg-gray-100 text-gray-700";

  return (
    <SidebarUI
      className={`${collapsed ? "w-14" : "w-64"} border-r border-gray-200 bg-white transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end hover:bg-gray-100" />

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-medium mb-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg px-3 py-2 transition-all duration-200 flex items-center ${collapsed ? 'justify-center' : 'gap-3'} ${item.comingSoon ? 'opacity-60 pointer-events-auto' : ''}`}
                      style={item.comingSoon ? { cursor: 'pointer' } : {}}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && (
                        <span className="font-medium flex items-center gap-2">
                          {item.title}
                          {item.comingSoon && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded bg-gray-200 text-gray-600 border border-gray-300">Coming Soon</span>
                          )}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarUI>
  );
}
