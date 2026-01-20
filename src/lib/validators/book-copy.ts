import { BookCopyStatus } from "@/types";
import { z } from "zod";

export const bookCopyFormSchema = z.object({
  bookId: z.number().min(1, "Book is required"),
  copyNumber: z.string().min(1, "Copy number is required"),
  year_published: z.string().min(4, "Year published is required"),
  status: z.nativeEnum(BookCopyStatus),
});

export type BookCopyFormValues = z.infer<typeof bookCopyFormSchema>;
