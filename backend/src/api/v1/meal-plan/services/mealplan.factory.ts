import { MockMealRepository } from "../repo/__mock__/mealplan.mock";
import { MongoMealPlanRepo } from "../repo/mealplan.mongo.repo";
import { MealPlanService } from "./mealplan.services";

export const createMealService = () => {
  if (process.env.NODE_ENV === "test") {
    return new MealPlanService(MockMealRepository);
  }
  return new MealPlanService(new MongoMealPlanRepo());
};
