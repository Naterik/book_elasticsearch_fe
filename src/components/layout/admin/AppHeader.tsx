import React from "react";
import { useNavigate } from "react-router";
import { Menu, Settings, LogOut, User } from "lucide-react";
import { useCurrentApp } from "@/app/providers/app.context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppHeaderProps {
  onMenuClick?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated } = useCurrentApp();
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/admin");
  };

  const getUserInitials = () => {
    if (!user?.fullName) return "AD";
    const names = user.fullName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.fullName.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">LA</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-gray-900 leading-none">
                Library Admin
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Dashboard</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900">
              {user?.fullName || "Admin User"}
            </span>
            <span className="text-xs text-gray-500">
              {user?.email || "admin@library.com"}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full ring-2 ring-gray-200 hover:ring-blue-500 transition-all"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user?.avatar}
                    alt={user?.fullName || "Admin"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white border-gray-200 shadow-lg"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900">
                    {user?.fullName || "Admin User"}
                  </p>
                  <p className="text-xs leading-none text-gray-500">
                    {user?.email || "admin@library.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem
                onClick={handleSettings}
                className="cursor-pointer text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
