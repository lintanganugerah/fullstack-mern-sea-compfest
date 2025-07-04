import { z } from "zod";

export const MealPlanSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().min(1),
  image: z.string().url().optional(),
});

export const CreateMealSchema = MealPlanSchema;

export const UpdateMealSchema = MealPlanSchema.partial();

export const GetMealParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

// For Swagger
export type MealPlanInput = z.infer<typeof MealPlanSchema>;
