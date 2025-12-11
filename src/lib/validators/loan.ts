import { z } from "zod";

export const loanFormSchema = z.object({
  bookId: z.string().min(1, "Book copy is required"),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.string().min(1, "Status is required"),
});

export type LoanFormValues = z.infer<typeof loanFormSchema>;
