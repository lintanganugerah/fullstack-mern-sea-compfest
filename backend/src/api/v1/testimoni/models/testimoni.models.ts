import { Schema, model } from "mongoose";
import { Testimoni } from "../types/testimoni.types";

export const TestimoniSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    mealPlanId: {
      type: Schema.Types.ObjectId,
      ref: "MealPlan",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const TestimoniModel = model<Testimoni>("Testimoni", TestimoniSchema);
