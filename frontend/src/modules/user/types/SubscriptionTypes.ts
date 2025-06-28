import type { DELIVERY_DAYS, MEAL_TYPES } from "../const/MealConst";

export type SubscriptionFormData = {
  name: string;
  phoneNumber: string;
  mealPlanId: string;
  mealTypes: MealType[];
  deliveryDays: DeliveryDay[];
  allergies?: string;
};

export type MealType = (typeof MEAL_TYPES)[number];
export type DeliveryDay = (typeof DELIVERY_DAYS)[number];
