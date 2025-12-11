import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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

  const handleClick = () => {
    onClick?.();
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }

    const path = getNotificationPath(notification.type);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 ${bgColor} ${
        !notification.isRead ? "opacity-100" : "opacity-75"
      } cursor-pointer hover:shadow-md transition-shadow`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {content}
              </p>
              <p className="text-xs text-muted-foreground mt-2">{timeAgo}</p>
            </div>

            <div className="flex-shrink-0 flex gap-1">
              {!notification.isRead && onMarkAsRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onMarkAsRead(notification.id)}
                  title="Mark as read"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onDelete(notification.id)}
                  title="Delete"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
