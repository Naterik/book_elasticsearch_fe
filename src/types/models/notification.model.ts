/**
 * Notification Model
 */

export interface INotification {
  id: number;
  sentAt: string;
  type: string;
  content: string;
  isRead: boolean;
  userId: number;
}
