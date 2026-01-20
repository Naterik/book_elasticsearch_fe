import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Info, LogOut, Menu } from "lucide-react";
import { Link } from "react-router";
import logo from "@/assets/logo-invenio-ils.svg";
const NAV_ITEMS = [
  { to: "/books", label: "Search" },
  { to: "/about", label: "About" },
];
const MobileSheet = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className=" md:hidden text-white ml-1 "
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[80%] sm:w-80 p-0 ">
          <SheetHeader className=" py-3 border-b bg-neutral-800/90">
            <SheetTitle className="flex items-center gap-2 ">
              <img src={logo} alt="logo" className="h-6 w-auto" />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col p-2">
            {NAV_ITEMS.map((item) => (
              <SheetClose asChild key={item.to}>
                <Link
                  to={item.to}
                  className="rounded-lg px-4 py-3 text-base font-medium hover:bg-neutral-500 dark:hover:bg-neutral-800"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}

            <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />
            <SheetClose asChild>
              <Link
                to="/profile"
                className="rounded-lg px-4 py-3 text-base font-medium hover:bg-neutral-400 dark:hover:bg-neutral-800 flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                Info
              </Link>
            </SheetClose>
            <button
              className="text-left rounded-lg px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2"
              onClick={() => {}}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSheet;
