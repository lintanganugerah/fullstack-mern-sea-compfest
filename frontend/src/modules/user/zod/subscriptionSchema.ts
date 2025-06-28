import { z } from "zod";

export const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^[0-9]{10,15}$/, "Invalid phone number"),
  mealPlanId: z.string().min(1, "Please select a meal plan"),
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
