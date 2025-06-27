import { Schema, model } from "mongoose";
import { Testimoni } from "../types/testimoni.types";

export const TestimoniSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const TestimoniModel = model<Testimoni>("Testimoni", TestimoniSchema);
