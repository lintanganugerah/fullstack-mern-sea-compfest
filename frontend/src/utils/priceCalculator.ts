export interface PlanPricing {
  Diet: number;
  Protein: number;
  Royal: number;
}

//TODO: Hapusi ni nanti, cuman sebagai dummy
export const PLAN_PRICES: PlanPricing = {
  Diet: 30000,
  Protein: 40000,
  Royal: 60000,
};

export const calculateSubscriptionPrice = (
  planType: keyof PlanPricing,
  mealTypes: string[],
  deliveryDays: string[]
): number => {
  const planPrice = PLAN_PRICES[planType];
  const mealTypeCount = mealTypes.length;
  const deliveryDayCount = deliveryDays.length;
  const weeksInMonth = 4.3;

  return Math.round(
    planPrice * mealTypeCount * deliveryDayCount * weeksInMonth
  );
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
