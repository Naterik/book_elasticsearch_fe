import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import type { INotification } from "@/types/entities/notification";
import { socketService } from "@/lib/api/socket";
import { useCurrentApp } from "./app.context";
import NotificationService from "@/features/client/notification/services";

interface INotificationContext {
  notifications: INotification[];
  unreadCount: number;
  isConnected: boolean;
  addNotification: (notification: INotification) => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  getHighPriorityNotifications: () => INotification[];
  getUnreadNotifications: () => INotification[];
}

const NotificationContext = createContext<INotificationContext | null>(null);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { isAuthenticated, user } = useCurrentApp();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const connectionAttempted = useRef(false);
  const socketUnsubscribe = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      socketService.disconnect();
      setIsConnected(false);
      connectionAttempted.current = false;
      return;
    }
    if (connectionAttempted.current) return;
    connectionAttempted.current = true;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    // 📥 Fetch initial notifications from server
    const fetchInitialNotifications = async () => {
      try {
        const res = await NotificationService.getNotificationsByUserId(user.id);
        if (res.data) {
          setNotifications(res.data);
          const unreadCount = res.data.filter(
            (n: INotification) => !n.isRead
          ).length;
          setUnreadCount(unreadCount);
        }
      } catch (error) {
        console.error("Failed to fetch initial notifications:", error);
      }
    };

    // 🔌 Connect to Socket.IO
    socketService
      .connect(token)
      .then(() => {
        setIsConnected(true);
        fetchInitialNotifications();
      })
      .catch((error) => {
        console.error("Failed to connect socket:", error);
        setIsConnected(false);
        // Still fetch initial notifications even if socket connection fails
        fetchInitialNotifications();
      });

    return () => {};
  }, [isAuthenticated, user]);

  const handleNewNotification = useCallback((notification: INotification) => {
    // ⚡ Minimal setState - just add notification
    setNotifications((prev) => {
      // Prevent duplicates
      if (prev.some((n) => n.id === notification.id)) return prev;
      return [notification, ...prev];
    });

    // ⚡ Minimal setState - update unread count
    if (!notification.isRead) {
      setUnreadCount((prev) => prev + 1);
    }
  }, []);

  const handleUnreadCountUpdate = useCallback((data: { count: number }) => {
    setUnreadCount(data.count);
  }, []);

  useEffect(() => {
    if (!isConnected) return;
    if (socketUnsubscribe.current) {
      socketUnsubscribe.current();
    }

    const unsubNotif = socketService.onNotification(handleNewNotification);
    const unsubCount = socketService.onUnreadCountUpdate(
      handleUnreadCountUpdate
    );

    socketUnsubscribe.current = () => {
      unsubNotif();
      unsubCount();
    };

    return () => {
      if (socketUnsubscribe.current) {
        socketUnsubscribe.current();
      }
    };
  }, [isConnected, handleNewNotification, handleUnreadCountUpdate]);

  const addNotification = useCallback((notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  const markAsRead = useCallback((id: number) => {
    socketService.markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    socketService.markAllNotificationsAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  const getHighPriorityNotifications = useCallback(() => {
    return notifications.filter((n) => n.priority === "HIGH");
  }, [notifications]);

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter((n) => !n.isRead);
  }, [notifications]);

  const contextValue = useMemo<INotificationContext>(
    () => ({
      notifications,
      unreadCount,
      isConnected,
      addNotification,
      removeNotification,
      clearNotifications,
      markAsRead,
      markAllAsRead,
      getHighPriorityNotifications,
      getUnreadNotifications,
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
      getHighPriorityNotifications,
      getUnreadNotifications,
    ]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * ⚡ Hook to use notifications
 * Base hook - returns full context
 */
export const useNotifications = (): INotificationContext => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  }
  return context;
};

export { NotificationContext };
export default NotificationProvider;
