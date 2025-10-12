// src/features/client/info/types.ts
export type ActivityType = "borrow" | "return" | "reserve" | "fine";

export type Activity = {
  id: string;
  type: ActivityType;
  bookTitle: string;
  date: string; // ISO hoặc dạng 'YYYY-MM-DD'
  description: string;
};

export type NotificationType = "reminder" | "available" | "overdue";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

export type Stats = {
  totalBooksRead: number;
  currentLoans: number;
  overdueBooks: number;
  totalFines: number;
  favoriteBooks: number;
  readingGoal: number;
  readingStreak: number;
};

export type LoanStatus = "ON_LOAN" | "RETURNED" | "OVERDUE" | "LOST";
export type BookCopyStatus = "AVAILABLE" | "ON_LOAN" | "ON_HOLD" | "LOST";
export type UserStatus = "ACTIVE" | "PENDING_CARD" | "INACTIVE" | "SUSPENDED";
export type ReservationStatus =
  | "PENDING"
  | "NOTIFIED"
  | "COMPLETED"
  | "CANCELED";
