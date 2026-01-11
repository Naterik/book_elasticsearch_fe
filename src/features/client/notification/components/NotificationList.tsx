import { useEffect, useState, useCallback } from "react";
import { useCurrentApp } from "@/app/providers/app.context";
import { toast } from "sonner";

import NotificationItem from "./NotificationItem";
import { Button } from "@/components/ui/button";
import { Loader2, MailCheck, Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NotificationService } from "@/lib/api";

export default function NotificationList() {
  const { user } = useCurrentApp();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const res = await NotificationService.getNotificationsByUserId(user.id);
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
      await NotificationService.putSingleNotificationAsRead(user.id, id);
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
      await NotificationService.putBulkNotificationAsRead(user.id);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
      toast.success("All notifications marked as read");
    } catch (error) {
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
    <div className="w-full max-w-5xl mx-auto p-4">
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md shadow-blue-200">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Notifications
                </h2>
                <p className="text-sm text-slate-500">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${
                        unreadCount !== 1 ? "s" : ""
                      }`
                    : "No unread notifications"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={isMarkingAll}
                className="gap-2 hover:bg-slate-50"
              >
                {isMarkingAll ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Marking...</span>
                  </>
                ) : (
                  <>
                    <MailCheck className="h-4 w-4" />
                    <span className="hidden sm:inline">Mark all as read</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
              <p className="text-slate-500 text-sm">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">
                No notifications yet
              </h3>
              <p className="text-slate-500 text-sm max-w-xs">
                When you receive notifications, they'll appear here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 hover:bg-slate-50/50 transition-colors"
                >
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {notifications.length > 0 && (
          <CardFooter className="border-t border-slate-100 py-4 bg-slate-50/30">
            <div className="w-full text-center text-xs text-slate-400">
              Showing {notifications.length} notification
              {notifications.length !== 1 ? "s" : ""}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
