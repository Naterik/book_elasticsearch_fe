import {
  formatNotificationContent,
  formatTimeAgo,
  getNotificationColor,
  getNotificationIcon,
  getNotificationIconColor,
  getNotificationPath,
  getNotificationTitle,
} from "@/helper/notificationUtils";
import { useNavigate } from "react-router-dom";

type NotificationItemProps = {
  notification: INotification;
  onMarkAsRead?: (id: number) => void;
  // onDelete?: (id: number) => void;
  onClick?: () => void;
};

export default function NotificationItem({
  notification,
  onMarkAsRead,
  // onDelete,
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

  // const handleMarkAsRead = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (onMarkAsRead) {
  //     onMarkAsRead(notification.id);
  //   }
  // };

  // const handleDelete = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (onDelete) {
  //     onDelete(notification.id);
  //   }
  // };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
      className={`group relative cursor-pointer rounded-lg border bg-white transition-all duration-200 ${
        !notification.isRead
          ? "border-blue-200 bg-blue-50/30 shadow-sm hover:shadow-md"
          : "border-transparent hover:bg-slate-50"
      } `}
    >
      {/* Unread indicator dot */}
      {!notification.isRead && (
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-600" />
      )}

      <div className="p-3">
        <div className="flex gap-4">
          {/* Icon container */}
          <div className="mt-1 flex-shrink-0">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${bgColor} `}
            >
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 pr-6">
            <div className="mb-0.5 flex items-start justify-between gap-2">
              <h3
                className={`text-sm font-semibold ${!notification.isRead ? "text-slate-900" : "text-slate-700"} `}
              >
                {title}
              </h3>
            </div>

            <p
              className={`mb-1.5 text-sm leading-relaxed ${!notification.isRead ? "text-slate-800" : "text-slate-600"} `}
            >
              {content}
            </p>

            <div className="flex items-center gap-2">
              <time className="text-xs text-slate-400">{timeAgo}</time>
              {!notification.isRead && (
                <span className="text-xs font-medium text-blue-600">• New</span>
              )}
            </div>
          </div>

          {/* Action buttons - visible on hover */}
          <div className="flex flex-shrink-0 flex-col gap-1 self-center opacity-0 transition-opacity group-hover:opacity-100">
            {/* Actions moved to right side or handled differently if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
