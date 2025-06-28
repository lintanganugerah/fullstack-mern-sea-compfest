import z from "zod";
import type { registerSchemaZod } from "../zod/registerSchemaZod";

export type RegisterFormData = z.infer<typeof registerSchemaZod>;
