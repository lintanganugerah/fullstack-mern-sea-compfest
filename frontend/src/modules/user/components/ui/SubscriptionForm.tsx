import React from "react";
import type { MealPlan } from "modules/user/types/MealPlanTypes";
import type { SubscriptionFormData } from "modules/user/types/SubscriptionTypes";

interface Props {
  formData: SubscriptionFormData;
  setFormData: React.Dispatch<React.SetStateAction<SubscriptionFormData>>;
  mealPlans: MealPlan[];
  mealTypes: string[];
  deliveryDays: string[];
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

const SubscriptionForm: React.FC<Props> = ({
  formData,
  setFormData,
  mealPlans,
  mealTypes,
  deliveryDays,
  handleSubmit,
  isSubmitting,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Phone */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className={`w-full border p-2 rounded ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}

        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
          className={`w-full border p-2 rounded mt-4 ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      {/* Meal Plan */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Meal Plan</h2>
        {mealPlans.map((meal) => (
          <div
            key={meal._id}
            className="flex items-center border gap-2 p-2 my-2 rounded"
          >
            <input
              type="radio"
              name="mealPlan"
              checked={formData.mealPlanId === meal._id}
              onChange={() =>
                setFormData((prev) => ({ ...prev, mealPlanId: meal._id }))
              }
            />
            <div>
              <div className="font-medium">{meal.name}</div>
              <div className="text-sm text-gray-600">
                Rp {meal.price.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {errors.mealPlanId && (
          <p className="text-sm text-red-500 mt-1">{errors.mealPlanId}</p>
        )}
      </div>

      {/* Meal Types */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Meal Types</h2>
        {mealTypes.map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 border p-2 my-2 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={formData.mealTypes.includes(type)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mealTypes: e.target.checked
                    ? [...prev.mealTypes, type]
                    : prev.mealTypes.filter((t) => t !== type),
                }))
              }
            />
            <span>{type}</span>
          </label>
        ))}
        {errors.mealTypes && (
          <p className="text-sm text-red-500 mt-1">{errors.mealTypes}</p>
        )}
      </div>

      {/* Delivery Days */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Delivery Days</h2>
        {deliveryDays.map((day) => (
          <label
            key={day}
            className="flex items-center gap-2 border p-2 my-2 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={formData.deliveryDays.includes(day)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deliveryDays: e.target.checked
                    ? [...prev.deliveryDays, day]
                    : prev.deliveryDays.filter((d) => d !== day),
                }))
              }
            />
            <span>{day}</span>
          </label>
        ))}
        {errors.deliveryDays && (
          <p className="text-sm text-red-500 mt-1">{errors.deliveryDays}</p>
        )}
      </div>

      {/* Allergies */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Allergies</h2>
        <textarea
          value={formData.allergies}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, allergies: e.target.value }))
          }
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Processing..." : "Subscribe Now"}
      </button>
    </form>
  );
};

export default SubscriptionForm;
