import { ServiceResponse } from "@/common/utils/serviceResponse";
import { Request, RequestHandler, Response } from "express";
import { createAuthService } from "../service/auth.factory";
import { respond } from "@/common/utils/responseHandler";

const authService = createAuthService();

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (req.body.role && req.body.role == "admin" && !req.isAdmin) {
    respond(
      res,
      ServiceResponse.failure("Forbidden: You can't do t", undefined, 403)
    );
  }

  const existing = await authService.checkUserExist(req.body.email);
  if (existing) {
    respond(res, ServiceResponse.failure("Email already registered"));
    return;
  }

  let role = "user";

  if (req.isAdmin) {
    role = "admin";
  }

  const payload = {
    ...req.body,
    role: "user",
  };

  const userCreated = await authService.registerUser(payload);
  if (!userCreated) {
    respond(
      res,
      ServiceResponse.failure("Something Wrong Happened", undefined, 500)
    );
    return;
  }

  respond(
    res,
    ServiceResponse.success("User Succesfully Registered", undefined, 201)
  );
};

//Controller sudah melalui pengecekan apakah yang createa adalah admin atau tidak pada routes
export const createAdmin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const existing = await authService.checkUserExist(req.body.email);
  if (existing) {
    respond(res, ServiceResponse.failure("Email already registered"));
    return;
  }

  const payload = {
    ...req.body,
    role: "admin",
  };

  const userCreated = await authService.registerUser(payload);
  if (!userCreated) {
    respond(
      res,
      ServiceResponse.failure("Something Wrong Happened", undefined, 500)
    );
    return;
  }

  respond(
    res,
    ServiceResponse.success("User Succesfully Registered", undefined, 201)
  );
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  if (!result.success) {
    respond(res, ServiceResponse.failure(result.message, null, 401));
    return;
  }
  respond(res, ServiceResponse.success("Login successful", result.token));
};
