import { z } from "zod";

export const genreFormSchema = z.object({
  name: z.string().min(1, "Genre name is required"),
  description: z.string().optional().or(z.literal("")),
});

export type GenreFormValues = z.infer<typeof genreFormSchema>;
