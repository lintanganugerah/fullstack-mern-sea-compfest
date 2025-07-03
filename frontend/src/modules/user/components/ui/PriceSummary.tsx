import React from "react";
import { formatPrice } from "utils/priceCalculator";
import type { SubscriptionFormData } from "modules/user/types/SubscriptionTypes";
import { mealPlans } from "modules/user/mock/MealPlanMock";

interface Props {
  formData: SubscriptionFormData;
  totalPrice: number;
}

const PriceSummary: React.FC<Props> = ({ formData, totalPrice }) => {
  const selectedPlan = mealPlans.find((m) => m._id === formData.mealPlanId);

  return (
    <div className="border p-6 rounded-lg shadow-md bg-white sticky top-20">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Price Summary</h2>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Meal Plan</h3>
        {selectedPlan ? (
          <div className="flex justify-between text-sm">
            <span>{selectedPlan.name}</span>
            <span>{formatPrice(selectedPlan.price)}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No plan selected.</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Meal Types</h3>
        {formData.mealTypes.length ? (
          <ul className="list-disc pl-5 text-sm text-gray-800">
            {formData.mealTypes.map((t) => <li key={t}>{t}</li>)}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No meal types selected.</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Delivery Days</h3>
        <p>{formData.deliveryDays.length || 0} days/week</p>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Total</h3>
        <span className="text-lg font-semibold text-blue-600">
          {formatPrice(totalPrice)} / month
        </span>
      </div>
    </div>
  );
};

export default PriceSummary;
