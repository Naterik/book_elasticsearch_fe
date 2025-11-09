import { z } from "zod";

export const fineFormSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  reason: z.string().min(1, "Reason is required"),
  isPaid: z.string(),
  loanId: z.string().min(1, "Loan ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

export type FineFormValues = z.infer<typeof fineFormSchema>;
