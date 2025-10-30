export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  PENDING: "PENDING",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const UserAccountType = {
  GOOGLE: "GOOGLE",
  LOCAL: "LOCAL",
} as const;

export type UserAccountType =
  (typeof UserAccountType)[keyof typeof UserAccountType];

export const UserRole = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
