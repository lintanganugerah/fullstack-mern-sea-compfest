import { Request, RequestHandler, Response } from "express";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { createSubsService } from "../services/subs.factory";
import { respond } from "@/common/utils/responseHandler";
import { SubsService } from "../services/subs.services";
import { MealPlanService } from "@/api/v1/meal-plan/services/mealplan.services";
import { createMealService } from "@/api/v1/meal-plan/services/mealplan.factory";

const subsService: SubsService = createSubsService();
const mealplanService: MealPlanService = createMealService();

export const getSubs: RequestHandler = async (_: Request, res: Response) => {
  const allSubs = await subsService.getAllSubs();
  respond(res, ServiceResponse.success(undefined, allSubs));
};

export const getSubsById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const subs = await subsService.getByIdSubs(req.params.id);
  if (!subs) {
    respond(res, ServiceResponse.failure("Subs not found", undefined, 404));
    return;
  }
  respond(res, ServiceResponse.success(undefined, subs));
};

export const createSubs: RequestHandler = async (
  req: Request,
  res: Response
) => {
  //TODO: Add User id and user Name here if Auth endpoint/middleware done
  const mealPlan = await mealplanService.getMealById(req.body.mealPlanId);
  if (!mealPlan) {
    respond(
      res,
      ServiceResponse.failure("Meal Plan not found", undefined, 404)
    );
    return;
  }

  const totalPrice =
    mealPlan.price *
    req.body.mealTypes.length *
    req.body.deliveryDays.length *
    4.3;

  // Langsung jadikan body sebagai payload karena sudah divalidasi oleh middleware
  const payload = {
    ...req.body,
    totalPrice: totalPrice,
  };

  const subsCreated = await subsService.createSubs(payload);

  respond(res, ServiceResponse.success(undefined, subsCreated, 201));
};
