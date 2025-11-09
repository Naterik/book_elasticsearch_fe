import { z } from "zod";

export const bookCopyFormSchema = z.object({
  bookId: z.string().min(1, "Book is required"),
  copyNumber: z.string().min(1, "Copy number is required"),
  yearPublished: z.string().min(4, "Year published is required"),
  status: z.string().min(1, "Status is required"),
  location: z.string().min(1, "Location is required"),
});

export type BookCopyFormValues = z.infer<typeof bookCopyFormSchema>;
