import z from "zod";

export const registerSchemaZod = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include uppercase")
    .regex(/[a-z]/, "Must include lowercase")
    .regex(/[0-9]/, "Must include number")
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      "Must include symbol character e.g. !@#$%^&*()_+-=[]{};':\"\\|,.<>/?"
    ),
});
