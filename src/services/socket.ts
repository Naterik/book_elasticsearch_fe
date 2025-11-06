import { io, Socket } from "socket.io-client";

export interface IUnreadCountUpdate {
  count: number;
}

type NotificationCallback = (notification: INotification) => void;
type UnreadCountCallback = (data: IUnreadCountUpdate) => void;

class SocketService {
  private socket: Socket | null = null;
  private notificationListeners: Set<NotificationCallback> = new Set();
  private unreadCountListeners: Set<UnreadCountCallback> = new Set();
  private isConnecting = false;

  public connect(token: string): Promise<void> {
    if (this.isConnecting) return Promise.resolve();
    if (this.socket?.connected) return Promise.resolve();

    this.isConnecting = true;

    return new Promise((resolve, reject) => {
      try {
        const serverUrl = import.meta.env.VITE_BACKEND_URL;

        this.socket = io(serverUrl, {
          auth: { token },
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
          transports: ["websocket", "polling"],
          upgrade: false,
          rememberUpgrade: false,
        });

        this.socket.on("connect", () => {
          console.log("✅ WebSocket connected");
          this.isConnecting = false;
          resolve();
        });

        this.socket.on("connect_error", (error: any) => {
          console.error("❌ WebSocket connection error:", error);
          this.isConnecting = false;
          reject(error);
        });

        this.socket.on("disconnect", () => {
          console.warn("⚠️ WebSocket disconnected");
        });

        this.socket.on("new_notification", (notification: INotification) => {
          this.notifyListeners(notification);
        });

        this.socket.on("unread_count_update", (data: IUnreadCountUpdate) => {
          this.notifyUnreadCountListeners(data);
        });
      } catch (error: any) {
        console.error("Error connecting to WebSocket:", error);
        this.isConnecting = false;
        reject(error);
      }
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.notificationListeners.clear();
      this.unreadCountListeners.clear();
      console.log("🔌 WebSocket disconnected");
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  public markNotificationAsRead(notificationId: number): void {
    if (this.socket?.connected) {
      this.socket.emit("mark_notification_as_read", notificationId);
    }
  }

  public markAllNotificationsAsRead(): void {
    if (this.socket?.connected) {
      this.socket.emit("mark_all_notifications_as_read");
    }
  }

  public onNotification(callback: NotificationCallback): () => void {
    this.notificationListeners.add(callback);
    return () => {
      this.notificationListeners.delete(callback);
    };
  }

  /**
   * Subscribe to unread count updates
   */
  public onUnreadCountUpdate(callback: UnreadCountCallback): () => void {
    this.unreadCountListeners.add(callback);
    return () => {
      this.unreadCountListeners.delete(callback);
    };
  }

  /**
   * Notify all listeners about new notification
   */
  private notifyListeners(notification: INotification): void {
    this.notificationListeners.forEach((callback) => {
      try {
        callback(notification);
      } catch (error) {
        console.error("Error in notification listener:", error);
      }
    });
  }

  /**
   * Notify all listeners about unread count update
   */
  private notifyUnreadCountListeners(data: IUnreadCountUpdate): void {
    this.unreadCountListeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error("Error in unread count listener:", error);
      }
    });
  }

  /**
   * Get socket instance (for debugging)
   */
  public getSocket(): Socket | null {
    return this.socket;
  }
}

// Singleton
export const socketService = new SocketService();
