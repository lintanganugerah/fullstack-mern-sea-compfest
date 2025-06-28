import { Router, RequestHandler } from "express";
import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import z from "zod";

import * as MealController from "./controller/mealplan.controller";
import {
  MealPlanSchema,
  CreateMealSchema,
  UpdateMealSchema,
  GetMealParamsSchema,
} from "./zod/mealPlan.zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpValidate";
import { ServiceResponseSchema } from "@/common/utils/serviceResponse";
import { requireAdmin } from "@/common/middleware/requireAdmin";
import { requireAuth } from "@/common/middleware/requireAuth";

extendZodWithOpenApi(z);

export const mealRegistry = new OpenAPIRegistry();
export const mealRouter = Router();

mealRegistry.register("MealPlan", MealPlanSchema);
mealRegistry.register("MealPlanList", MealPlanSchema.array());
mealRegistry.register(
  "ServiceResponse<MealPlan>",
  ServiceResponseSchema(MealPlanSchema)
);
mealRegistry.register(
  "ServiceResponse<MealPlanList>",
  ServiceResponseSchema(MealPlanSchema.array())
);

// POST /api/v1/mealplan (Create Mealplan)
mealRegistry.registerPath({
  method: "post",
  path: "/mealplan",
  tags: ["MealPlan"],
  request: {
    body: { content: { "application/json": { schema: MealPlanSchema } } },
  },
  responses: createApiResponse(
    ServiceResponseSchema(MealPlanSchema),
    "Meal created"
  ),
});
mealRouter.post(
  "/",
  requireAuth,
  requireAdmin,
  validateRequest(CreateMealSchema),
  MealController.postMeal
);

// PUT /api/v1/mealplan/:id (Update Mealplan)
mealRegistry.registerPath({
  method: "put",
  path: "/mealplan/{id}",
  tags: ["MealPlan"],
  request: {
    params: UpdateMealSchema.shape.params,
    body: {
      content: { "application/json": { schema: MealPlanSchema.partial() } },
    },
  },
  responses: createApiResponse(
    ServiceResponseSchema(MealPlanSchema),
    "Meal updated"
  ),
});
mealRouter.put(
  "/:id",
  requireAuth,
  requireAdmin,
  validateRequest(UpdateMealSchema),
  MealController.putMeal
);

// DELETE /api/v1/mealplan/:id (Delete Mealplan)
mealRegistry.registerPath({
  method: "delete",
  path: "/mealplan/{id}",
  tags: ["MealPlan"],
  request: {
    params: GetMealParamsSchema.shape.params,
  },
  responses: createApiResponse(ServiceResponseSchema(z.null()), "Meal deleted"),
});
mealRouter.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  validateRequest(GetMealParamsSchema),
  MealController.deleteMeal as RequestHandler
);

// GET /api/v1/mealplan (All Mealplans)
mealRegistry.registerPath({
  method: "get",
  path: "/mealplan",
  tags: ["MealPlan"],
  responses: createApiResponse(
    ServiceResponseSchema(MealPlanSchema.array()),
    "Success"
  ),
});
mealRouter.get("/", MealController.getMeals);

// GET /api/v1/mealplan/:id (Specific Mealplan)
mealRegistry.registerPath({
  method: "get",
  path: "/mealplan/{id}",
  tags: ["MealPlan"],
  responses: createApiResponse(
    ServiceResponseSchema(MealPlanSchema),
    "Success"
  ),
});
mealRouter.get("/:id", MealController.getMealById);
