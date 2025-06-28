import { z } from "zod";

export const TestimoniSchemaZod = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  mealPlanId: z.string().min(1),
  message: z.string().min(1),
  rating: z.number().int().max(5).min(1),
});

//Name dan user id ambil dari jwt token yang valid
export const CreateTestimoniSchemaZod = TestimoniSchemaZod.omit({
  userId: true,
  name: true,
});
