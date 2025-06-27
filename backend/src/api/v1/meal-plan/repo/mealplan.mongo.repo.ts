import { IMealPlanRepository } from "../types/mealplan.types";
import { MealPlanModel } from "../models/mealplan.models";
import { MealPlan, UpdateMealRequest } from "../types/mealplan.types";

export class MongoMealPlanRepo implements IMealPlanRepository {
  async getAll() {
    return MealPlanModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string) {
    return MealPlanModel.findById(id);
  }

  async create(input: MealPlan) {
    return MealPlanModel.create(input);
  }

  async update(id: string, input: UpdateMealRequest) {
    return MealPlanModel.findByIdAndUpdate(id, input, { new: true });
  }

  async delete(id: string) {
    const deleted = await MealPlanModel.findByIdAndDelete(id);
    return deleted !== null;
  }
}
