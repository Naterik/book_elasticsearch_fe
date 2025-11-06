import { useEffect, useState, useCallback } from "react";
import { useCurrentApp } from "@/app/providers/app.context";
import { toast } from "sonner";

import NotificationItem from "./NotificationItem";
import { Button } from "@/components/ui/button";
import { Loader2, MailCheck } from "lucide-react";
import {
  getNotificationsByUserIdAPI,
  putBulkNotificationAsReadAPI,
  putSingleNotificationAsReadAPI,
} from "@/services/api";

export default function NotificationList() {
  const { user } = useCurrentApp();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const res = await getNotificationsByUserIdAPI(user.id);
      if (res.data) {
        setNotifications(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id: number) => {
    if (!user?.id) return;
    try {
      await putSingleNotificationAsReadAPI(user.id, id);
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
      await putBulkNotificationAsReadAPI(user.id);
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

  const handleDelete = async (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications?.filter((n) => !n.isRead).length;

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {unreadCount} unread
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAll}
            className="gap-2"
          >
            {isMarkingAll ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Marking...</span>
              </>
            ) : (
              <>
                <MailCheck className="h-4 w-4" />
                <span>Mark all as read</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Notifications */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
