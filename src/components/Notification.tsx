import { useEffect, useState, useCallback } from "react";
import { CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentApp } from "@/app/providers/app.context";
import { toast } from "sonner";
import {
  getNotificationsByUserIdAPI,
  putBulkNotificationAPI,
  putSingleNotificationAPI,
} from "@/services/notifications";
import {
  getNotificationIcon,
  getNotificationIconColor,
  getNotificationTitle,
  formatNotificationContent,
  formatTimeAgo,
  getNotificationPath,
} from "@/features/client/notifications/notificationUtils";

export default function Notifications() {
  const { user } = useCurrentApp();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res: any = await getNotificationsByUserIdAPI(user.id);
      if (res?.data && Array.isArray(res.data)) {
        setNotifications(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [user?.id]);

  useEffect(() => {
    setIsLoading(true);
    fetchNotifications().finally(() => setIsLoading(false));
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.id) return;

    try {
      await putSingleNotificationAPI(user.id, id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!user?.id || isMarkingAll) return;

    setIsMarkingAll(true);
    try {
      await putBulkNotificationAPI(user.id);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      toast.error("Failed to mark all as read");
    } finally {
      setIsMarkingAll(false);
    }
  };

  const handleNotificationClick = (notification: INotification) => {
    const path = getNotificationPath(notification.type as any);
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
        <div className="font-medium text-sm">
          Notifications
          {notifications.length > 0 && (
            <span className="text-muted-foreground">
              {" "}
              ({notifications.length})
            </span>
          )}
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

      {isLoading ? (
        <div className="p-4 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-2">Loading...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="p-4 text-sm text-muted-foreground text-center">
          No notifications
        </div>
      ) : (
        <ScrollArea className="max-h-80">
          <ul className="p-2 space-y-1">
            {displayNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type as any);
              const iconColor = getNotificationIconColor(
                notification.type as any
              );
              const title = getNotificationTitle(notification.type as any);
              const content = formatNotificationContent(notification.content);
              const timeAgo = formatTimeAgo(notification.sentAt);

              return (
                <li
                  key={notification.id}
                  className={`rounded-lg px-3 py-2 text-sm hover:bg-muted/60 cursor-pointer transition-colors
                    ${!notification.isRead ? "bg-muted/40 font-medium" : ""}`}
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
                    <div className="flex gap-2 min-w-0 flex-1">
                      <div className="flex-shrink-0 mt-0.5">
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-xs truncate">{title}</p>
                        <p className="text-muted-foreground line-clamp-2 text-xs mt-0.5">
                          {content}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          {!notification.isRead && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
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
        <Link to="/notifications" className="w-full block">
          <Button variant="outline" className="w-full text-xs">
            View all {notifications.length > 0 && `(${notifications.length})`}
          </Button>
        </Link>
      </div>
    </>
  );
}
