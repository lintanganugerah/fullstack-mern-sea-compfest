import { z } from "zod";

export const subscriptionSchemaZod = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  mealPlanId: z.string().min(1, "Meal Plan ID is required"), // string ID
  mealTypes: z
    .array(z.enum(["breakfast", "lunch", "dinner"]))
    .min(1, "Select at least one meal type"),
  deliveryDays: z
    .array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ])
    )
    .min(1, "Select at least one delivery day"),
  allergies: z.string().optional(),
});
