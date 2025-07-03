import type { MealPlan } from "modules/user/types/MealPlanTypes";
import type {
  MealType,
  DeliveryDay,
} from "modules/user/types/SubscriptionTypes";

export const calculateTotalSubscription = (
  selectedMealPlan: MealPlan | null,
  selectedMealTypes: MealType[],
  selectedDeliveryDays: DeliveryDay[]
): number => {
  if (
    !selectedMealPlan ||
    selectedMealTypes.length === 0 ||
    selectedDeliveryDays.length === 0
  ) {
    return 0;
  }

  const pricePerMeal = selectedMealPlan.price;
  const mealTypeCount = selectedMealTypes.length;
  const deliveryDayCount = selectedDeliveryDays.length;
  const weeksInMonth = 4.3;

  const total = pricePerMeal * mealTypeCount * deliveryDayCount * weeksInMonth;

  return Math.round(total);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
