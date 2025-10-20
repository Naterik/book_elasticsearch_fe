"use client";

import * as React from "react";
import {
  Book,
  BookUp,
  Building,
  CalendarClock,
  CircleDollarSign,
  Copy,
  CreditCard,
  GalleryVerticalEnd,
  LayoutDashboard,
  Library,
  PenSquare,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { useLocation } from "react-router-dom";

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
    title: "Reservations",
    url: "/admin/reservations",
    icon: CalendarClock,
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
      <SidebarFooter>
        <NavUser user={sampleData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
