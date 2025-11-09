export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  PENDING_CARD: "PENDING",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const UserAccountType = {
  GOOGLE: "GOOGLE",
  SYSTEM: "SYSTEM",
};

export type UserAccountType =
  (typeof UserAccountType)[keyof typeof UserAccountType];
