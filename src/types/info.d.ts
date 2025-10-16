export type NotificationType = "reminder" | "available" | "overdue";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export type LoanStatus = "ON_LOAN" | "RETURNED" | "OVERDUE" | "LOST";
export type BookCopyStatus = "AVAILABLE" | "ON_LOAN" | "ON_HOLD" | "LOST";
export type UserStatus = "ACTIVE" | "PENDING_CARD" | "INACTIVE" | "SUSPENDED";
export type ReservationStatus =
  | "PENDING"
  | "NOTIFIED"
  | "COMPLETED"
  | "CANCELED";
