import z from "zod";

export const TestimoniSchemaZod = z.object({
  _id: z.string(), // dari MongoDB
  userId: z.string().min(1),
  name: z.string().min(1),
  mealPlanId: z.string().min(1),
  message: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  createdAt: z.string(), // ISO string dari Mongoose
  updatedAt: z.string(),
});

export const CreateTestimoniSchemaZod = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  mealPlanId: z.string().min(1),
  message: z.string().min(1),
  rating: z.number().int().max(5).min(1),
});
