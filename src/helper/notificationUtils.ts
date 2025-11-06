import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  RotateCcw,
  Calendar,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

// type NotificationType =
//   | "MEMBERSHIP_ACTIVATED"
//   | "MEMBERSHIP_INACTIVE"
//   | "LOAN_CREATED"
//   | "LOAN_RENEWED"
//   | "RESERVATION_CREATED"
//   | "SUCCESS_RETURNED"
//   | "FINE_CREATED"
//   | "PAYMENT_RECEIVED";

export const getNotificationIcon = (type: string): LucideIcon => {
  switch (type) {
    case "MEMBERSHIP_ACTIVATED":
      return CheckCircle2;
    case "MEMBERSHIP_INACTIVE":
      return AlertTriangle;
    case "LOAN_CREATED":
      return BookOpen;
    case "LOAN_RENEWED":
      return RotateCcw;
    case "RESERVATION_CREATED":
      return Calendar;
    case "SUCCESS_RETURNED":
      return CheckCircle2;
    case "FINE_CREATED":
      return AlertTriangle;
    case "PAYMENT_RECEIVED":
      return CreditCard;
    default:
      return Bell;
  }
};

export const getNotificationIconColor = (type: string): string => {
  switch (type) {
    case "MEMBERSHIP_ACTIVATED":
      return "text-green-600";
    case "MEMBERSHIP_INACTIVE":
      return "text-red-600";
    case "LOAN_CREATED":
      return "text-blue-600";
    case "LOAN_RENEWED":
      return "text-purple-600";
    case "RESERVATION_CREATED":
      return "text-orange-600";
    case "SUCCESS_RETURNED":
      return "text-emerald-600";
    case "FINE_CREATED":
      return "text-red-600";
    case "PAYMENT_RECEIVED":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

export const getNotificationColor = (type: string): string => {
  switch (type) {
    case "MEMBERSHIP_ACTIVATED":
      return "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800";
    case "MEMBERSHIP_INACTIVE":
      return "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800";
    case "LOAN_CREATED":
      return "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800";
    case "LOAN_RENEWED":
      return "bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800";
    case "RESERVATION_CREATED":
      return "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800";
    case "SUCCESS_RETURNED":
      return "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800";
    case "FINE_CREATED":
      return "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800";
    case "PAYMENT_RECEIVED":
      return "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800";
    default:
      return "bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-800";
  }
};

export const getNotificationTitle = (type: string): string => {
  switch (type) {
    case "MEMBERSHIP_ACTIVATED":
      return "Membership Activated";
    case "MEMBERSHIP_INACTIVE":
      return "Membership Inactive";
    case "LOAN_CREATED":
      return "Book Borrowed";
    case "LOAN_RENEWED":
      return "Loan Renewed";
    case "RESERVATION_CREATED":
      return "Reservation Created";
    case "SUCCESS_RETURNED":
      return "Book Returned";
    case "FINE_CREATED":
      return "Fine Created";
    case "PAYMENT_RECEIVED":
      return "Payment Received";
    default:
      return "Notification";
  }
};

export const formatNotificationContent = (content: string): string => {
  return content.replace(/\*/g, "").replace(/\n/g, " ").trim();
};

export const formatTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return past.toLocaleDateString();
};

export const getNotificationPath = (type: string): string | null => {
  switch (type) {
    case "MEMBERSHIP_ACTIVATED":
    case "MEMBERSHIP_INACTIVE":
      return "/info";
    case "LOAN_CREATED":
    case "LOAN_RENEWED":
      return "/loan";
    case "FINE_CREATED":
    case "PAYMENT_RECEIVED":
      return "/fine";
    case "RESERVATION_CREATED":
      return "/loan";
    case "SUCCESS_RETURNED":
      return "/loan";
    default:
      return null;
  }
};
