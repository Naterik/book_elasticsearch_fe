import * as z from "zod";

export const memberRegistrationSchema = z.object({
  fullName: z.string().min(5, {
    message: "Full name must be at least 5 characters.",
  }),
  phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
    message: "Invalid phone number format.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  duration: z.enum(["6", "12", "COD"], {
    message: "You must select a membership duration.",
  }),
  paymentRef: z.string().optional(),
});

export type MemberRegistrationSchema = z.infer<typeof memberRegistrationSchema>;
