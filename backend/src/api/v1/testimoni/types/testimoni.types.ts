import { InferSchemaType } from "mongoose";
import { TestimoniSchema } from "../models/testimoni.models";
import z from "zod";
import { TestimoniSchemaZod } from "../zod/testimoni.zod";

export type Testimoni = InferSchemaType<typeof TestimoniSchema>;

export type CreateTestimoniInput = z.infer<typeof TestimoniSchemaZod>;
