import { Link } from "react-router-dom";
import logo from "@/assets/logo-invenio-ils.svg";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Bell, Menu, Info, LogOut, User, History } from "lucide-react";
import Notifications from "../../Notification";
import MobileSheet from "../MobileSheet";

const NAV_ITEMS = [
  { to: "/book", label: "Search" },
  { to: "/about", label: "About" },
];

export default function AppHeader() {
  return (
    <header className="container mx-auto  sticky top-0 z-50 border-b bg-neutral-900/90 backdrop-blur text-white">
      <div className="flex h-16 items-center justify-between ">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-auto" />
          <span className="sr-only">Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden md:block">
            <NavigationMenu className="bg-transparent">
              <NavigationMenuList className="gap-1">
                {NAV_ITEMS.map((item) => (
                  <NavigationMenuItem key={item.to}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.to}
                        className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-neutral-500/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-b-2"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open notifications"
              >
                <span className="relative">
                  <Bell className="size-5.5" />
                </span>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-80 p-0">
              <Notifications />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 text-white"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" alt="@user" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="hover:bg-gray-500/10">
                <Link to="/loan" className="flex items-center gap-2 ">
                  <History className="mr-2 h-4 w-4 text text-green-500" />
                  Loan
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-gray-500/10">
                <Link to="/info" className="flex items-center gap-2 ">
                  <Info className="mr-2 h-4 w-4 text text-cyan-500" />
                  Info
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className=" hover:bg-gray-500/10"
                onClick={() => {}}
              >
                <LogOut className="mr-2 h-4 w-4 text-red-600" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <MobileSheet />
        </div>
      </div>
    </header>
  );
}
