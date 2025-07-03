import type { BaseApiResponseTypes } from "types/BaseApiResponse";
import type { DELIVERY_DAYS, MEAL_TYPES } from "../const/MealConst";
import type { MealPlan } from "./MealPlanTypes";
import z from "zod";
import type { subscriptionSchema } from "../zod/subscriptionSchema";

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

export type SubscriptionAllResponse = BaseApiResponseTypes & {
  responseObject: MealPlan[];
};
export type SubscriptionOneResponse = BaseApiResponseTypes & {
  responseObject: MealPlan;
};
export type CreateSubscriptionResponse = SubscriptionOneResponse;
export type CreateSubscription = SubscriptionFormData;
