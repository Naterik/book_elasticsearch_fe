import { useMemo } from "react";
import { useNotifications } from "@/app/providers/notification.context";

export interface IUseNotificationRealtimeReturn {
  notifications: any[];
  unreadCount: number;
  isConnected: boolean;
  addNotification: (notification: any) => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  getUnreadNotifications: () => any[];
  getHighPriorityNotifications: () => any[];
}

export const useNotificationRealtime = (): IUseNotificationRealtimeReturn => {
  const {
    notifications,
    unreadCount,
    isConnected,
    addNotification,
    removeNotification,
    clearNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadNotifications,
    getHighPriorityNotifications,
  } = useNotifications();

  return useMemo(
    () => ({
      notifications,
      unreadCount,
      isConnected,
      addNotification,
      removeNotification,
      clearNotifications,
      markAsRead,
      markAllAsRead,
      getUnreadNotifications,
      getHighPriorityNotifications,
    }),
    [
      notifications,
      unreadCount,
      isConnected,
      addNotification,
      removeNotification,
      clearNotifications,
      markAsRead,
      markAllAsRead,
      getUnreadNotifications,
      getHighPriorityNotifications,
    ]
  );
};

export const useNotificationBadge = () => {
  const { unreadCount } = useNotifications();

  return useMemo(
    () => ({
      unreadCount,
    }),
    [unreadCount]
  );
};

export const useNotificationToasts = () => {
  const { notifications } = useNotifications();

  return useMemo(
    () => ({
      notifications,
    }),
    [notifications]
  );
};

export default useNotificationRealtime;
