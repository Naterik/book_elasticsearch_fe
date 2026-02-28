"use client";

import {
  Book,
  BookUp,
  Building,
  CircleDollarSign,
  Copy,
  CreditCard,
  GalleryVerticalEnd,
  LayoutDashboard,
  Library,
  PenSquare,
  Users,
} from "lucide-react";
import * as React from "react";

import { useCurrentApp } from "@/app/providers/app.context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Books",
    url: "/admin/books",
    icon: Book,
  },
  {
    title: "Book Copies",
    url: "/admin/book-copies",
    icon: Copy,
  },
  {
    title: "Authors",
    url: "/admin/authors",
    icon: PenSquare,
  },
  {
    title: "Genres",
    url: "/admin/genres",
    icon: Library,
  },
  {
    title: "Publishers",
    url: "/admin/publishers",
    icon: Building,
  },
  {
    title: "Loans",
    url: "/admin/loans",
    icon: BookUp,
  },
  {
    title: "Fines",
    url: "/admin/fines",
    icon: CircleDollarSign,
  },
  {
    title: "Payments",
    url: "/admin/payments",
    icon: CreditCard,
  },
];

const sampleData = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Library Admin",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { user } = useCurrentApp();

  const processedNavItems = React.useMemo(() => {
    return navItems.map((item) => ({
      ...item,
      isActive: location.pathname === item.url,
    }));
  }, [location.pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sampleData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={processedNavItems} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
