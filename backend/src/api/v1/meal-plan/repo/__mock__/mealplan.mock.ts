import { v4 as uuid } from "uuid";
import { IMealPlanRepository } from "@/api/v1/meal-plan/types/mealplan.types";

let mockData = [
  {
    _id: "1",
    name: "Nasi Goreng",
    price: 20000,
    description: "Enak",
    image: "url",
  },
];

export const MockMealRepository: IMealPlanRepository = {
  async getAll() {
    return mockData;
  },
  async getById(id) {
    return mockData.find((m) => m._id === id) || null;
  },
  async create(data) {
    const newMeal = { ...data, _id: uuid(), image: data.image || "" };
    mockData.push(newMeal);
    return newMeal;
  },
  async update(id, data) {
    const index = mockData.findIndex((m) => m._id === id);
    if (index === -1) return null;
    mockData[index] = { ...mockData[index], ...data };
    return mockData[index];
  },
  async delete(id) {
    mockData = mockData.filter((m) => m._id !== id);
  },
};
