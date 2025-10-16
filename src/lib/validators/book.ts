import { z } from "zod";

export const bookFormSchema = z.object({
  isbn: z.string().min(10, "ISBN must be at least 10 characters"),
  title: z.string().min(1, "Title is required"),
  shortDesc: z.string().optional().or(z.literal("")),
  detailDesc: z.string().optional().or(z.literal("")),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  publishDate: z.string().min(1, "Publish date is required"),
  language: z.string().min(1, "Language is required"),
  pages: z.string().min(1, "Pages is required"),
  authorId: z.string().min(1, "Author is required"),
  publisherId: z.string().min(1, "Publisher is required"),
  genreIds: z.array(z.string()).min(1, "At least one genre is required"),
  image: z.instanceof(File).optional().or(z.literal(undefined)),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;
