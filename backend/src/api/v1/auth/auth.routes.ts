import {
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import z from "zod";

import * as AuthController from "./controller/auth.controller";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  CsrfResponseSchemaZod,
  LoginResponseSchemaZod,
  LoginSchemaZod,
  RegisterResponseSchemaZod,
  RegisterSchemaZod,
} from "./zod/auth.zod";
import { ServiceResponseSchema } from "@/common/utils/serviceResponse";
import { validateRequest } from "@/common/utils/httpValidate";
import { requireAdmin } from "@/common/middleware/requireAdmin";
import { requireAuth } from "@/common/middleware/requireAuth";
import { requireCsrfToken } from "@/common/middleware/requireCsrfToken";

extendZodWithOpenApi(z);

export const authRegistry = new OpenAPIRegistry();
export const authRouter = Router();

// Register schemas
authRegistry.register("RegisterRequest", RegisterSchemaZod);
authRegistry.register("LoginRequest", LoginSchemaZod);

authRegistry.register(
  "ServiceResponse<Register>",
  ServiceResponseSchema(RegisterResponseSchemaZod)
);
authRegistry.register("ServiceResponse<Login>", LoginResponseSchemaZod);

// POST /api/v1/auth/register (User Only)
authRegistry.registerPath({
  method: "post",
  path: "/register",
  tags: ["Auth"],
  request: {
    body: {
      content: { "application/json": { schema: RegisterSchemaZod } },
    },
  },
  responses: createApiResponse(
    ServiceResponseSchema(RegisterResponseSchemaZod),
    "User Succesfully Registered"
  ),
});

authRouter.post(
  "/register",
  validateRequest(RegisterSchemaZod),
  AuthController.registerUser
);

// POST /api/v1/auth/register/admin (Admin Only)
authRegistry.registerPath({
  method: "post",
  path: "/register/admin",
  tags: ["Auth"],
  request: {
    body: {
      content: { "application/json": { schema: RegisterSchemaZod } },
    },
  },
  responses: createApiResponse(
    ServiceResponseSchema(RegisterResponseSchemaZod),
    "Admin Succesfully Registered"
  ),
});

authRouter.post(
  "/register/admin",
  requireAuth,
  requireAdmin,
  requireCsrfToken,
  validateRequest(RegisterSchemaZod),
  AuthController.createAdmin
);

// POST /api/v1/auth/login
authRegistry.registerPath({
  method: "post",
  path: "/login",
  tags: ["Auth"],
  request: {
    body: {
      content: { "application/json": { schema: LoginSchemaZod } },
    },
  },
  responses: createApiResponse(
    ServiceResponseSchema(LoginResponseSchemaZod),
    "Login Success"
  ),
});

authRouter.post(
  "/login",
  validateRequest(LoginSchemaZod),
  AuthController.login
);

// GET /api/v1/auth/csf
authRegistry.registerPath({
  method: "get",
  path: "/csf",
  tags: ["Auth"],
  responses: createApiResponse(
    ServiceResponseSchema(CsrfResponseSchemaZod),
    "Login Success"
  ),
});

authRouter.get("/csf", requireAuth, AuthController.refreshCsrf);
