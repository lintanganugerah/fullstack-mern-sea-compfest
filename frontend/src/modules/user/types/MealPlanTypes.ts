import z from "zod";
import type {
  CreateMealPlanSchemaZod,
  MealPlanSchemaZod,
} from "../zod/MealPlan.schema";
import type { BaseApiResponseTypes } from "types/BaseApiResponse";

export type MealPlan = z.infer<typeof MealPlanSchemaZod>;
export type CreateMealPlan = z.infer<typeof CreateMealPlanSchemaZod>;
export type UpdateMealPlan = Partial<CreateMealPlan>;

export type MealPlanGetAllResponse = BaseApiResponseTypes & {
  responseObject: MealPlan[];
};
export type MealPlanGetOneResponse = BaseApiResponseTypes & {
  responseObject: MealPlan;
};
export type UpdateMealPlanResponse = MealPlanGetOneResponse;
export type CreateMealPlanResponse = MealPlanGetOneResponse;
