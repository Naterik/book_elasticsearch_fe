export const PaymentStatus = {
  PENDING: "PENDING",
  PAYMENT_SUCCEED: "PAYMENT_SUCCEED",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  CANCELLED: "CANCELLED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentMethod = {
  VNPAY: "VNPAY",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentType = {
  MEMBERSHIP: "membership",
  FINE: "fine",
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];
