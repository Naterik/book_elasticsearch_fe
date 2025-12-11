import { z } from "zod";

export const publisherFormSchema = z.object({
  name: z.string().min(1, "Publisher name is required"),
  address: z.string().optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^[0-9+\-() ]*$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

export type PublisherFormValues = z.infer<typeof publisherFormSchema>;
