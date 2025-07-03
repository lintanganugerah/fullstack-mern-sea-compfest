import { Request, Response, NextFunction } from "express";
import { respond } from "../utils/responseHandler";
import { ServiceResponse } from "../utils/serviceResponse";
import { aliasName } from "../utils/aliasName";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  console.log(req.user, aliasName["admin"]);

  if (!user) {
    respond(res, ServiceResponse.failure("Token Not Found"));
    return;
  }

  if (user.rl && user.rl === aliasName["admin"]) {
    req.isAdmin = true;
    next();
  } else {
    req.isAdmin = false;
    respond(res, ServiceResponse.failure("Forbidden: You can't access this"));
  }
}
