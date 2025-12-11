import { z } from "zod";

export const reservationFormSchema = z.object({
  bookId: z.string().min(1, "Book is required"),
  userId: z.string().min(1, "User ID is required"),
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;
