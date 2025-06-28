import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { calculateTotalSubscription, formatPrice } from "utils/priceCalculator";
import SubscriptionForm from "../components/ui/SubscriptionForm";
import PriceSummary from "../components/ui/PriceSummary";
import { mealPlans } from "../mock/MealPlanMock";
import type { SubscriptionFormData } from "../types/SubscriptionTypes";
import { subscriptionSchema } from "../zod/subscriptionSchema";
import { ZodError } from "zod";

export default function SubscriptionPage() {
  const deliveryDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const mealTypes = ["breakfast", "lunch", "dinner"];

  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: "",
    phoneNumber: "",
    mealPlanId: "",
    mealTypes: [],
    deliveryDays: [],
    allergies: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const selectedMealPlan =
      mealPlans.find((m) => m._id === formData.mealPlanId) ?? null;

    const total = calculateTotalSubscription(
      selectedMealPlan,
      formData.mealTypes,
      formData.deliveryDays
    );

    setTotalPrice(total);
  }, [formData.mealPlanId, formData.mealTypes, formData.deliveryDays]);

  const validateForm = () => {
    try {
      subscriptionSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please check the form errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));

    toast.success(
      `Subscription created successfully. Total: ${formatPrice(
        totalPrice
      )} / month`
    );
    console.log("Submitted:", { ...formData, totalPrice });

    setFormData({
      name: "",
      phoneNumber: "",
      mealPlanId: "",
      mealTypes: [],
      deliveryDays: [],
      allergies: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PriceSummary formData={formData} totalPrice={totalPrice} />
        </div>
        <div className="lg:col-span-2">
          <SubscriptionForm
            formData={formData}
            setFormData={setFormData}
            mealPlans={mealPlans}
            mealTypes={mealTypes}
            deliveryDays={deliveryDays}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
