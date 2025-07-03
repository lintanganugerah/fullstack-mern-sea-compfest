import { aliasName } from "@/common/utils/aliasName";
import z from "zod";

export const LoginSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const RegisterSchemaZod = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must include uppercase")
    .regex(/[a-z]/, "Must include lowercase")
    .regex(/[0-9]/, "Must include number")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "Must include special character e.g !@#$%^&*()_+-=[]{};':\"\\|,.<>/? "
    ),
});

export const UserRoleSchemaZod = z.object({
  role: z.enum(["admin", "user"]),
});

export const LoginResponseSchemaZod = z.object({
  token: z.string(),
});

export const RegisterResponseSchemaZod = z.object({
  message: z.string(),
});

export const CsrfResponseSchemaZod = z.object({
  [aliasName["csrf_token"]]: z.string(),
});
