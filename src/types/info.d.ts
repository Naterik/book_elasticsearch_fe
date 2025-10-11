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

export type UserProfile = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  cardNumber: string;
  membershipStart: string;
  membershipEnd: string;
  status: "active" | "inactive" | "banned";
  avatar?: string;
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

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  authors: string[];
  isbn: string;
  copyId: string;
  loanDate: string;
  dueDate: string;
  status: "borrowed" | "overdue" | "returned";
  renewalCount: number;
  maxRenewals: number;
  fineAmount: number;
  image: string;
}

export type LoanStatus = "ON_LOAN" | "RETURNED" | "OVERDUE" | "LOST";
export type BookCopyStatus = "AVAILABLE" | "ON_LOAN" | "ON_HOLD" | "LOST";
export type UserStatus = "ACTIVE" | "PENDING_CARD" | "INACTIVE" | "SUSPENDED";
