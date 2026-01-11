import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  formatNotificationContent,
  formatTimeAgo,
  getNotificationIcon,
  getNotificationIconColor,
  getNotificationPath,
  getNotificationTitle,
} from "@/helper/notificationUtils";
import { useNotificationRealtime } from "@client/notification/hooks/useNotificationRealtime";
import { CheckCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markAsRead, markAllAsRead } =
    useNotificationRealtime();
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const handleMarkAsRead = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    setIsMarkingAll(true);
    try {
      markAllAsRead();
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      toast.error("Failed to mark all as read");
    } finally {
      setIsMarkingAll(false);
    }
  };

  const handleNotificationClick = (notification: INotification) => {
    const path = getNotificationPath(notification.type as string);
    if (path) {
      navigate(path);
      if (!notification.isRead) {
        handleMarkAsRead(notification.id, {} as any);
      }
    }
  };

  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;
  const displayNotifications = notifications.slice(0, 3);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-sm font-medium">
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={handleMarkAllAsRead}
              disabled={isMarkingAll}
            >
              {isMarkingAll ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  <span>Marking...</span>
                </>
              ) : (
                <>
                  <CheckCheck className="mr-1 h-4 w-4" />
                  <span>Mark all</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      <Separator />

      {notifications.length === 0 ? (
        <div className="text-muted-foreground p-4 text-center text-sm">
          No notifications
        </div>
      ) : (
        <ScrollArea className="max-h-80">
          <ul className="space-y-1 p-2">
            {displayNotifications.map((notification: INotification) => {
              const notificationType = notification.type;
              const Icon = getNotificationIcon(notificationType);
              const iconColor = getNotificationIconColor(notificationType);
              const title = getNotificationTitle(notificationType);
              const content = formatNotificationContent(notification.content);
              const timeAgo = formatTimeAgo(notification.sentAt);

              return (
                <li
                  key={notification.id}
                  className={`hover:bg-muted/60 cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${!notification.isRead ? "bg-muted/40 font-medium" : ""}`}
                  onClick={() => handleNotificationClick(notification)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleNotificationClick(notification);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-1 gap-2">
                      <div className="mt-0.5 flex-shrink-0">
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">{title}</p>
                        <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                          {content}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          {!notification.isRead && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                          <span className="text-muted-foreground text-xs">
                            {timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      )}

      <Separator />
      <div className="p-2">
        <Link to="/user/notifications" className="block w-full">
          <Button variant="outline" className="w-full text-xs">
            View all {notifications.length > 0 && `(${notifications.length})`}
          </Button>
        </Link>
      </div>
    </>
  );
}
