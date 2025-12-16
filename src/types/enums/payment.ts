export const PaymentStatus = {
  PAID: "PAID",
  PAYMENT_SUCCEED: "PAYMENT_SUCCEED",
  FAILED: "FAILED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentMethod = {
  VNPAY: "VNPAY",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentType = {
  MEMBERSHIP_FEE: "MEMBERSHIP_FEE",
  FINE_PAYMENT: "FINE_PAYMENT",
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];
