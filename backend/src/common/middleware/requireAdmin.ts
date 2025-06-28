import { Request, Response, NextFunction } from "express";
import { respond } from "../utils/responseHandler";
import { ServiceResponse } from "../utils/serviceResponse";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

  if (!user) {
    respond(res, ServiceResponse.failure("Token Not Found"));
    return;
  }

  if (user.role && user.role === "admin") {
    req.isAdmin = true;
    next();
  } else {
    req.isAdmin = false;
    respond(res, ServiceResponse.failure("Forbidden: You can't access this"));
  }
}
