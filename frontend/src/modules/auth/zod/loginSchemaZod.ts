import z from "zod";

export const loginSchemaZod = z.object({
  email: z.string().email().min(1, "Cannot Be Empty"),
  password: z.string().min(1, "Cannot Be Empty"),
});
