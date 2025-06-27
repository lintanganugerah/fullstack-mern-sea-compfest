import { Request, Response } from "express";
import { MealPlanParams, UpdateMealRequest } from "../types/mealplan.types";
import type { TypedRequest } from "@/common/types/express.types";
import { createMealService } from "../services/mealplan.factory";
import { respond } from "@/common/utils/responseHandler";
import { ServiceResponse } from "@/common/utils/serviceResponse";

const mealService = createMealService();

export const getMeals = async (_req: Request, res: Response) => {
  const meals = await mealService.getAllMeals();
  respond(res, ServiceResponse.success(undefined, meals));
};

export const getMealById = async (
  req: TypedRequest<MealPlanParams>,
  res: Response
) => {
  const meal = await mealService.getMealById(req.params.id);

  if (!meal) {
    respond(res, ServiceResponse.failure("Meal not found", null, 404));
    return;
  }

  respond(res, ServiceResponse.success(undefined, meal));
};

export const postMeal = async (req: Request, res: Response) => {
  const meal = await mealService.createMeal(req.body);
  await respond(res, ServiceResponse.success(undefined, meal, 201));
};

export const putMeal = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body as UpdateMealRequest;
  const updated = await mealService.updateMeal(id, body);
  console.log(`ID UPDATED : ${req.params.id}`);

  if (!updated) {
    respond(res, ServiceResponse.failure("Meal not found", null, 404));
    return;
  }

  respond(res, ServiceResponse.success(undefined, updated, 201));
};

export const deleteMeal = async (req: Request, res: Response) => {
  const deleted = await mealService.deleteMeal(req.params.id);
  console.log(`ID DELETED : ${req.params.id}`);
  if (!deleted) {
    respond(res, ServiceResponse.failure("Meal not found", null, 404));
    return;
  } else {
    res.status(204).end();
  }
};
