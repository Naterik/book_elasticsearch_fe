/**
 * Notification Model
 */

export interface INotification {
  id: number;
  title: string;
  content: string;
  type: string;
  priority: "LOW" | "NORMAL" | "HIGH";
  sentAt: string;
  isRead?: boolean;
}
