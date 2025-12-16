export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  PENDING_CARD: "PENDING_CARD",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
