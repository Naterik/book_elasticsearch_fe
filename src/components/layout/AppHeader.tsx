import logo from "@/assets/logo-invenio-ils.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User, ChevronDown, Info, LogOut } from "lucide-react";

const AppHeader = () => {
  const items = [
    {
      label: "Info",
      key: "1",
      icon: <Info className="h-4 w-4" />,
      onClick: () => {},
      className: "",
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogOut className="h-4 w-4" />,
      onClick: () => {},
      className:
        "text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/40",
    },
  ];

  return (
    <>
      <header className="bg-neutral-900 text-white px-4 h-16 ">
        <div className="container mx-auto flex items-center">
          <div className="">
            <img src={logo} className="size-16" alt="logo" />
          </div>
          <nav className="flex-1 flex justify-end">
            <ul className="flex items-center gap-6">
              <li>
                <button className="hover:text-gray-400 hover:border-b-1">
                  Search
                </button>
              </li>
              <li>
                <button className="hover:text-gray-400 transition-colors">
                  Borrow
                </button>
              </li>
              <li>
                <button className="hover:text-gray-400 transition-colors">
                  Alert
                </button>
              </li>
            </ul>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="ml-10 flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {items.map((it) => (
                <DropdownMenuItem
                  key={it.key}
                  onClick={it.onClick}
                  className={it.className}
                >
                  <span className="mr-2">{it.icon}</span>
                  {it.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
