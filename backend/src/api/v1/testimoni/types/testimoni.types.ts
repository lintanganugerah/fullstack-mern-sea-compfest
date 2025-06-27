import { InferSchemaType } from "mongoose";
import { TestimoniSchema } from "../models/testimoni.models";

export type Testimoni = InferSchemaType<typeof TestimoniSchema>;
