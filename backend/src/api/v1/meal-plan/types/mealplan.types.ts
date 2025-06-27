import { InferSchemaType, Schema } from "mongoose";
import { MealPlanSchemaMongo } from "../models/mealplan.models";

export interface MealPlan {
  name: string;
  price: number;
  description: string;
  image?: string;
}

export type MealPlanMongoData = InferSchemaType<typeof MealPlanSchemaMongo> & {
  _id: Schema.Types.ObjectId
};

export interface MealPlanParams {
  id: string;
}

export interface IMealPlanRepository {
  getAll(): Promise<MealPlan[]>;
  getById(id: string): Promise<MealPlan | null>;
  create(input: MealPlan): Promise<MealPlan>;
  update(id: string, input: UpdateMealRequest): Promise<MealPlan | null>;
  delete(id: string): Promise<Boolean>;
}

export type UpdateMealRequest = Partial<MealPlan>;
