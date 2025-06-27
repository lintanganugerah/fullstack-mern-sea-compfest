import { Schema, model } from "mongoose";
import type { MealPlan } from "@/api/v1/meal-plan/types/mealplan.types";

const MealPlanSchema = new Schema<MealPlan>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const MealPlanModel = model<MealPlan>("MealPlan", MealPlanSchema);
