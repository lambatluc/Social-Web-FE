import z from "zod";

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>().optional(),
  location: z
    .string()
    .max(1000, { message: "Maximum 1000 characters." })
    .optional(),
  tags: z.string().optional(),
});

export type PostValidationType = z.infer<typeof PostValidation>;
