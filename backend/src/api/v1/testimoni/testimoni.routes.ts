import { Testimoni } from "./types/testimoni.types";
import { Router } from "express";
import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import z from "zod";

import * as TestimoniController from "./controller/testimoni.controller";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpValidate";
import { ServiceResponseSchema } from "@/common/utils/serviceResponse";
import {
  CreateTestimoniSchemaZod,
  TestimoniSchemaZod,
} from "./zod/testimoni.zod";
import { requireAuth } from "@/common/middleware/requireAuth";
import { requireCsrfToken } from "@/common/middleware/requireCsrfToken";

extendZodWithOpenApi(z);

export const testimoniRegistry = new OpenAPIRegistry();
export const testimoniRouter = Router();

testimoniRegistry.register("Testimoni", TestimoniSchemaZod);
testimoniRegistry.register("TestimoniList", TestimoniSchemaZod.array());
testimoniRegistry.register(
  "ServiceResponse<Testimoni>",
  ServiceResponseSchema(TestimoniSchemaZod)
);
testimoniRegistry.register(
  "ServiceResponse<TestimoniList>",
  ServiceResponseSchema(TestimoniSchemaZod.array())
);

// GET /api/v1/testimoni (All Testimonis)
testimoniRegistry.registerPath({
  method: "get",
  path: "/testimoni",
  tags: ["Testimoni"],
  responses: createApiResponse(
    ServiceResponseSchema(TestimoniSchemaZod.array()),
    "Success"
  ),
});
testimoniRouter.get("/", TestimoniController.getTestimoni);

// GET /api/v1/testimoni/:id (Specific Testimoni)
testimoniRegistry.registerPath({
  method: "get",
  path: "/testimoni/{id}",
  tags: ["Testimoni"],
  responses: createApiResponse(
    ServiceResponseSchema(TestimoniSchemaZod),
    "Success"
  ),
});
testimoniRouter.get("/:id", TestimoniController.getTestimoniById);

testimoniRegistry.registerPath({
  method: "post",
  path: "/testimoni",
  tags: ["Testimoni"],
  request: {
    body: {
      content: { "application/json": { schema: CreateTestimoniSchemaZod } },
    },
  },
  responses: createApiResponse(
    ServiceResponseSchema(CreateTestimoniSchemaZod),
    "Meal created"
  ),
});
testimoniRouter.post(
  "/",
  requireAuth,
  requireCsrfToken,
  validateRequest(CreateTestimoniSchemaZod),
  TestimoniController.createTestimoni
);
