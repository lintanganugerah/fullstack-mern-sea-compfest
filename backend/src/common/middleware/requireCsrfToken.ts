import { Request, Response, NextFunction } from "express";
import { verifyCsrfToken } from "@/common/utils/csrfUtils";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { respond } from "@/common/utils/responseHandler";
import { aliasName } from "../utils/aliasName";
import { serverLogger } from "../config/loggerConfig";

export function requireCsrfToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rawToken = req.headers["x-csrf-token"];
  const signedToken = req.cookies[aliasName["csrf_token_signed"]];

  serverLogger.info(`raw ${rawToken}, signed ${signedToken}`);

  if (
    !rawToken ||
    typeof rawToken !== "string" ||
    !signedToken ||
    !verifyCsrfToken(rawToken, signedToken)
  ) {
    respond(res, ServiceResponse.failure("Invalid CSRF token", null, 403));
    return;
  }

  next();
}
