import z from "zod";
import type { registerSchemaZod } from "../zod/registerSchemaZod";
import type { BaseApiResponseTypes } from "types/BaseApiResponse";

export type RegisterFormData = z.infer<typeof registerSchemaZod>;
export type RegisterResponse = BaseApiResponseTypes;
