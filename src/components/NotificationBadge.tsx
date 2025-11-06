import { useNotificationRealtime } from "@/features/client/notification/hooks/useNotificationRealtime";

export default function NotificationBadge() {
  const { unreadCount } = useNotificationRealtime();

  if (unreadCount === 0) return null;

  return (
    <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  );
}
