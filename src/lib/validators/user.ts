import { z } from "zod";
export const userStatusSchema = z.enum([
  "ACTIVE",
  "PENDING_CARD",
  "INACTIVE",
  "SUSPENDED",
]);

export const userAccountTypeSchema = z.enum(["SYSTEM", "GOOGLE"]);
export const userFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .email("Must be a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^[0-9+\-() ]*$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  roleId: z.string().min(1, "Role is required"),
  status: userStatusSchema.optional(),
  avatar: z.instanceof(File).optional().or(z.literal(undefined)),
});

export const createUserSchema = userFormSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = userFormSchema.extend({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
export type CreateUserValues = z.infer<typeof createUserSchema>;
export type UpdateUserValues = z.infer<typeof updateUserSchema>;
export type UserStatusType = z.infer<typeof userStatusSchema>;
export type UserAccountType = z.infer<typeof userAccountTypeSchema>;
