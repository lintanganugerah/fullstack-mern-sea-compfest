import { Request, Response } from "express";
import { createTestimoniService } from "../service/testimoni.factory";
import { respond } from "@/common/utils/responseHandler";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { TestimoniService } from "../service/testimoni.services";
import { MealPlanService } from "@/api/v1/meal-plan/services/mealplan.services";
import { createMealService } from "@/api/v1/meal-plan/services/mealplan.factory";

const testimoniService: TestimoniService = createTestimoniService();
const mealplanService: MealPlanService = createMealService();

export const getTestimoni = async (_: Request, res: Response) => {
  const allTestimoni = await testimoniService.getAllTestimoni();
  respond(res, ServiceResponse.success(undefined, allTestimoni));
};

export const getTestimoniById = async (req: Request, res: Response) => {
  const testimoni = await testimoniService.getByIdTestimoni(req.params.id);
  if (!testimoni) {
    respond(
      res,
      ServiceResponse.failure("Testimoni not found", undefined, 404)
    );
    return;
  }
  respond(res, ServiceResponse.success(undefined, testimoni));
};

export const createTestimoni = async (req: Request, res: Response) => {
  //TODO: Add User id and user Name here if Auth endpoint/middleware done
  const mealPlanExist = await mealplanService.getMealById(req.body.mealPlanId);
  console.log(`${JSON.stringify(req.body)}`);
  console.log(`meal plan : ${mealPlanExist}`);
  if (!mealPlanExist) {
    respond(
      res,
      ServiceResponse.failure("Meal Plan not found", undefined, 404)
    );
    return;
  }
  const payload = {
    message: req.body.message,
    mealPlanId: req.body.mealPlanId,
  };

  const dataCreated = await testimoniService.createTestimoni(payload);
  respond(res, ServiceResponse.success(undefined, dataCreated, 201));
};
