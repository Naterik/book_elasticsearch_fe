import { Bell, CheckCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
const sampleNotifications = [
  {
    id: 1,
    title: "New feature: Dark Mode available now!",
    body: "We're excited to announce that Dark Mode is finally here! Head over to settings to enable the new look for a more comfortable experience.",
    read: false, // Chưa đọc
    time: "5 minutes ago",
  },
  {
    id: 2,
    title: "Your subscription renewal is successful",
    body: "Your Pro plan subscription has been successfully renewed for another year. Thank you for your continued support!",
    read: true, // Đã đọc
    time: "3 hours ago",
  },
];
function Notifications({ items = sampleNotifications }) {
  const unreadCount = items.filter((i) => !i.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open notifications">
          <span className="relative">
            <Bell className="size-5.5" />
            {unreadCount > 0 && (
              <span
                className="absolute -right-1 -top-1 inline-flex items-center justify-center
                           rounded-full bg-red-500 text-white text-[10px] leading-none
                           h-4 min-w-4 px-1"
                aria-label={`${unreadCount} unread notifications`}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="font-medium">Notifications</div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <CheckCheck className="mr-1 h-4 w-4" /> Mark all read
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label="Close"
            >
              <X className="h-4 w-4 " />
            </Button>
          </div>
        </div>
        <Separator />

        {items.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          <ScrollArea className="max-h-80">
            <ul className="p-2 space-y-1">
              {items.map((n) => (
                <li
                  key={n.id}
                  className={`rounded-lg px-3 py-2 text-sm hover:bg-muted/60 cursor-pointer
                             ${!n.read ? "bg-muted/40" : ""}`}
                  role="button"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{n.title}</p>
                      <p className="text-muted-foreground line-clamp-2">
                        {n.body}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        {!n.read && <Badge variant="secondary">New</Badge>}
                        <span className="text-xs text-muted-foreground">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}

        <Separator />
        <div className="p-2">
          <Button variant="outline" className="w-full">
            View all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;
