import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { RequestHandler, Router } from "express";
import z from "zod";

import * as SubsController from "./controller/subs.controller";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  CreateSubscriptionSchemaZod,
  subscriptionSchemaZod,
} from "./zod/subs.zod";
import { ServiceResponseSchema } from "@/common/utils/serviceResponse";
import { validateRequest } from "@/common/utils/httpValidate";
import { requireAuth } from "@/common/middleware/requireAuth";
import { requireCsrfToken } from "@/common/middleware/requireCsrfToken";

extendZodWithOpenApi(z);

export const subsRegistry = new OpenAPIRegistry();
export const subsRouter = Router();

subsRegistry.register("Subscription", subscriptionSchemaZod);
subsRegistry.register("SubscriptionList", subscriptionSchemaZod.array());
subsRegistry.register(
  "ServiceResponse<Subscription>",
  ServiceResponseSchema(subscriptionSchemaZod)
);
subsRegistry.register(
  "ServiceResponse<SubscriptionList>",
  ServiceResponseSchema(subscriptionSchemaZod.array())
);

// GET /api/v1/subs (All subs)
subsRegistry.registerPath({
  method: "get",
  path: "/subs",
  tags: ["Subscription"],
  responses: createApiResponse(
    ServiceResponseSchema(subscriptionSchemaZod.array()),
    "Success"
  ),
});
subsRouter.get("/", SubsController.getSubs);

// GET /api/v1/subs/:id (Specific subs)
subsRegistry.registerPath({
  method: "get",
  path: "/subs/{id}",
  tags: ["Subscription"],
  responses: createApiResponse(
    ServiceResponseSchema(subscriptionSchemaZod),
    "Success"
  ),
});
subsRouter.get("/:id", SubsController.getSubsById);

subsRegistry.registerPath({
  method: "post",
  path: "/subs",
  tags: ["Subscription"],
  request: {
    body: {
      content: { "application/json": { schema: CreateSubscriptionSchemaZod } },
    },
  },
  responses: createApiResponse(
    ServiceResponseSchema(CreateSubscriptionSchemaZod),
    "Subscription created"
  ),
});
subsRouter.post(
  "/",
  requireAuth,
  requireCsrfToken,
  validateRequest(subscriptionSchemaZod),
  SubsController.createSubs
);
