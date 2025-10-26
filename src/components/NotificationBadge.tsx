import { useEffect, useState, useCallback } from "react";
import { useCurrentApp } from "@/app/providers/app.context";
import { getNotificationsByUserIdAPI } from "../services/notifications";

export default function NotificationBadge() {
  const { user } = useCurrentApp();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res: any = await getNotificationsByUserIdAPI(user.id);
      if (res?.data && Array.isArray(res.data)) {
        const count = res.data.filter((n: INotification) => !n.isRead).length;
        setUnreadCount(count);
      }
    } catch (error) {
      console.error("Failed to fetch unread notifications:", error);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUnreadCount();
    // Refresh every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  if (unreadCount === 0) return null;

  return (
    <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  );
}
