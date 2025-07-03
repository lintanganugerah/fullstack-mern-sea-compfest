import z from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const MealPlanSchemaZod = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z
    .any()
    .refine((file: typeof File) => {
      return (
        file.prototype.size <=
        Number(import.meta.env.VITE_MAX_FILE_SIZE_KB || 5120)
      );
    }, "Max image size is 5MB")
    .refine(
      (file: typeof File) => ACCEPTED_IMAGE_TYPES.includes(file.prototype.type),
      "File image must be in jpeg, jpg, png, webp"
    ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateMealPlanSchemaZod = MealPlanSchemaZod.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});
