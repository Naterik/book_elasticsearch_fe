export const LoanStatus = {
  ACTIVE: "ACTIVE",
  RETURNED: "RETURNED",
  OVERDUE: "OVERDUE",
  CANCELLED: "CANCELLED",
} as const;

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus];

export const ReservationStatus = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
} as const;

export type ReservationStatus =
  (typeof ReservationStatus)[keyof typeof ReservationStatus];
