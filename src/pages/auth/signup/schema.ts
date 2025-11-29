import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(1, "emptyUsername"),
    email: z.email({ message: "invalidEmail" }).min(1, "emptyEmail"),
    password: z
      .string()
      .trim()
      .min(1, "emptyPassword")
      .min(6, { message: "passwordMinLength" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, "emptyPasswordConfirm")
      .min(6, { message: "passwordMinLength" }),
  })
//   .superRefine(({ confirmPassword, password }, ctx) => {
//     if (confirmPassword !== password) {
//       ctx.addIssue({
//         code: "custom",
//         message: "passwordsNotMatch",
//         path: ["confirmPassword"],
//       });
//     }
//   });

export type SignupSchema = z.infer<typeof signupSchema>;
