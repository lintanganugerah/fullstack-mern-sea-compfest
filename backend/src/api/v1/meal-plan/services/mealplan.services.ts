import { IMealPlanRepository } from "../types/mealplan.types";
import { MealPlan, UpdateMealRequest } from "../types/mealplan.types";

export class MealPlanService {
  constructor(private readonly repo: IMealPlanRepository) {}

  async getAllMeals(): Promise<MealPlan[]> {
    return this.repo.getAll();
  }

  async getMealById(id: string): Promise<MealPlan | null> {
    return this.repo.getById(id);
  }

  async createMeal(input: MealPlan): Promise<MealPlan> {
    return this.repo.create(input);
  }

  async updateMeal(
    id: string,
    input: UpdateMealRequest
  ): Promise<MealPlan | null> {
    return this.repo.update(id, input);
  }

  async deleteMeal(id: string) {
    return this.repo.delete(id);
  }
}
