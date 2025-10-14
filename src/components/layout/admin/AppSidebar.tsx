import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Copy,
  UserCircle,
  Tag,
  Building2,
  HandCoins,
  CreditCard,
  CalendarClock,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Books",
    href: "/admin/books",
    icon: BookOpen,
  },
  {
    title: "Book Copies",
    href: "/admin/book-copies",
    icon: Copy,
  },
  {
    title: "Authors",
    href: "/admin/authors",
    icon: UserCircle,
  },
  {
    title: "Genres",
    href: "/admin/genres",
    icon: Tag,
  },
  {
    title: "Publishers",
    href: "/admin/publishers",
    icon: Building2,
  },
  {
    title: "Loans",
    href: "/admin/loans",
    icon: HandCoins,
  },
  {
    title: "Fines",
    href: "/admin/fines",
    icon: Wallet,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Reservations",
    href: "/admin/reservations",
    icon: CalendarClock,
  },
];

const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header - Mobile Only */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">LA</span>
            </div>
            <span className="font-bold text-gray-900">Library Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="mb-4 hidden lg:block">
            <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </h2>
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-blue-700" : "text-gray-500"
                    )}
                  />
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 text-xs font-bold">💡</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-900">Need Help?</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Check our documentation
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
