import { z } from "zod";

export const TestimoniSchemaZod = z.object({
  // userId: z.string().min(1),
  // name: z.string().min(1),
  mealPlanId: z.string().min(1),
  message: z.string().min(1),
});

export const CreateTestimoniSchemaZod = z.object({
  body: TestimoniSchemaZod,
});
