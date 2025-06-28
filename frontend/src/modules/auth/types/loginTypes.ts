import z from "zod";
import type { loginSchemaZod } from "../zod/loginSchemaZod";

export type LoginFormData = z.infer<typeof loginSchemaZod>;
