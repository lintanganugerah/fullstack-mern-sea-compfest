import { useState } from "react";
import MealPlanModal from "../components/ui/MealPlanModal";
import MealPlanCard from "../components/ui/MealPlanCard";
import type { MealPlan } from "../types/MealPlanTypes";
import { Link } from "react-router-dom";
import { useGetAllMealplanQuery } from "redux/apiQuery/mealplanApi";

export default function MenuPage() {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: mealPlans, isLoading, isError } = useGetAllMealplanQuery();

  const handleViewDetails = (plan: MealPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gray-800 mb-6">
            Our Meal Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our expertly crafted meal plans designed to meet your
            nutritional needs and taste preferences. Each plan is carefully
            balanced and prepared with the freshest ingredients.
          </p>
        </div>

        {isError ? (
          <div className="flex items-center justify-center">
            Error, can't get data
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mealPlans?.responseObject?.map((plan) => (
              <MealPlanCard
                key={plan._id}
                plan={plan}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-poppins text-gray-800 mb-4">
              Can't Decide Which Plan?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our nutrition experts are here to help you choose the perfect meal
              plan based on your goals, dietary restrictions, and lifestyle
              needs.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Need Help Choosing?
                </h3>
                <p className="text-sm text-gray-600">
                  <Link to={"/contact"} className="text-primary">
                    Click here
                  </Link>
                  to contact us
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Custom Requirements?
                </h3>
                <p className="text-sm text-gray-600">
                  We can accommodate special dietary needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MealPlanModal
        plan={selectedPlan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
