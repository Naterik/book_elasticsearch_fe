import logo from "@/assets/logo-invenio-ils.svg";
import { Link, useNavigate } from "react-router-dom";
// import mylogo from "@/assets/Gemini_Generated_Image_nakqk6nakqk6nakq.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { useCurrentApp } from "@/app/providers/app.context";
import MobileSheet from "@/components/layout/MobileSheet";
import Notifications from "@/components/Notification";
import NotificationBadge from "@/components/NotificationBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, History, Info, LogOut, ShieldUser, User } from "lucide-react";

const NAV_ITEMS = [
  { to: "/book", label: "Search" },
  { to: "/about", label: "About" },
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
];

export default function AppHeader() {
  const { setUser, setIsAuthenticated, setIsLoading, user, isAuthenticated } =
    useCurrentApp();
  const navigate = useNavigate();
  const isAdmin = user?.role.includes("ADMIN");
  const isLogin = user ? NAV_ITEMS.slice(0, 2) : NAV_ITEMS || NAV_ITEMS;
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(true);
    navigate("/");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <header
      className="
        sticky z-50
        text-white
        bg-neutral-900/90
        border-b
        backdrop-blur
        top-0
      "
    >
      <div
        className="
          container flex
          h-16
          mx-auto
          items-center justify-between
        "
      >
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="h-8 w-auto" />
          <span className="sr-only">Home</span>
        </Link>

        <div className="flex gap-3 items-center">
          <nav className="hidden md:block">
            <NavigationMenu className="bg-transparent">
              <NavigationMenuList className="gap-1">
                {isLogin.map((item) => (
                  <NavigationMenuItem key={item.to}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.to}
                        className="
                          inline-flex
                          px-3 py-2
                          text-sm font-medium
                          rounded-md
                          items-center hover:bg-white focus-visible:border-b-2 focus-visible:ring-2 focus-visible:outline-none
                        "
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          {isAuthenticated && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open notifications"
                  className="relative"
                >
                  <Bell className="size-5.5" />
                  <NotificationBadge />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-80 p-0">
                <Notifications />
              </PopoverContent>
            </Popover>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex gap-2 px-2 text-white items-center"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.avatar} alt="@user" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{user.fullName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild className="hover:bg-gray-500/10">
                    <Link to="/admin" className="flex gap-2 items-center">
                      <ShieldUser className="h-4 w-4 mr-2 text-purple-500 text" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild className="hover:bg-gray-500/10">
                  <Link to="/user/loan" className="flex gap-2 items-center">
                    <History className="h-4 w-4 mr-2 text-green-500 text" />
                    Loan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gray-500/10">
                  <Link
                    to="/user/notifications"
                    className="flex gap-2 items-center"
                  >
                    <Bell className="h-4 w-4 mr-2 text-blue-500 text" />
                    Notifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gray-500/10">
                  <Link to="/user/info" className="flex gap-2 items-center">
                    <Info className="h-4 w-4 mr-2 text-cyan-500 text" />
                    Info
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-gray-500/10"
                >
                  <LogOut className="h-4 w-4 mr-2 text-red-600" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <MobileSheet />
        </div>
      </div>
    </header>
  );
}
