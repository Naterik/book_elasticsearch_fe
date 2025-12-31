import { useNavigate } from "react-router-dom";
import {
  getNotificationIcon,
  getNotificationIconColor,
  getNotificationColor,
  getNotificationTitle,
  formatNotificationContent,
  formatTimeAgo,
  getNotificationPath,
} from "@/helper/notificationUtils";

type NotificationItemProps = {
  notification: INotification;
  onMarkAsRead?: (id: number) => void;
  onDelete?: (id: number) => void;
  onClick?: () => void;
};

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onClick,
}: NotificationItemProps) {
  const navigate = useNavigate();
  const Icon = getNotificationIcon(notification.type);
  const iconColor = getNotificationIconColor(notification.type);
  const bgColor = getNotificationColor(notification.type);
  const title = getNotificationTitle(notification.type);
  const content = formatNotificationContent(notification.content);
  const timeAgo = formatTimeAgo(notification.sentAt);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    onClick?.();
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }

    const path = getNotificationPath(notification.type);
    if (path) {
      navigate(path);
    }
  };

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(notification.id);
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-lg border transition-all duration-200 ${
        !notification.isRead
          ? "border-blue-200 shadow-sm hover:shadow-md bg-blue-50/30"
          : "border-transparent hover:bg-slate-50"
      } cursor-pointer`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
    >
      {/* Unread indicator dot */}
      {!notification.isRead && (
        <div className="absolute right-4 top-4 w-2 h-2 bg-blue-600 rounded-full" />
      )}

      <div className="p-3">
        <div className="flex gap-4">
          {/* Icon container */}
          <div className="flex-shrink-0 mt-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor}`}
            >
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <h3
                className={`font-semibold text-sm ${
                  !notification.isRead ? "text-slate-900" : "text-slate-700"
                }`}
              >
                {title}
              </h3>
            </div>

            <p
              className={`text-sm leading-relaxed mb-1.5 ${
                !notification.isRead ? "text-slate-800" : "text-slate-600"
              }`}
            >
              {content}
            </p>

            <div className="flex items-center gap-2">
              <time className="text-xs text-slate-400">{timeAgo}</time>
              {!notification.isRead && (
                <span className="text-xs text-blue-600 font-medium">• New</span>
              )}
            </div>
          </div>

          {/* Action buttons - visible on hover */}
          <div className="flex-shrink-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity self-center">
            {/* Actions moved to right side or handled differently if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
