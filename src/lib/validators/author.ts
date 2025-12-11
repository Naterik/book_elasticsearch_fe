import { z } from "zod";

export const authorFormSchema = z.object({
  name: z.string().min(1, "Author name is required"),
  bio: z.string().optional().or(z.literal("")),
});

export type AuthorFormValues = z.infer<typeof authorFormSchema>;
