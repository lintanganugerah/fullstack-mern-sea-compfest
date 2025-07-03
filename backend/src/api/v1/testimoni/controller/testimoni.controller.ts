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
  const body = req.body;
  if (!req.user) {
    respond(
      res,
      ServiceResponse.failure("Unauthorized: Missing user data", undefined, 401)
    );
    return;
  }

  const payload = {
    ...body,
    userId: req.user.id,
    name: req.user.fullName,
  };

  const dataCreated = await testimoniService.createTestimoni(payload);
  respond(res, ServiceResponse.success(undefined, dataCreated, 201));
};
