import { Request, Response, NextFunction } from "express";
import { verifyCsrfToken } from "@/common/utils/csrfUtils";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { respond } from "@/common/utils/responseHandler";

export function requireCsrfToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rawToken =
    req.headers["x-csrf-token"] || req.body?._csrf || req.query?._csrf;

  const signedToken = req.cookies["csrf_token_signed"];

  if (
    !rawToken ||
    typeof rawToken !== "string" ||
    !signedToken ||
    !verifyCsrfToken(rawToken, signedToken)
  ) {
    respond(
      res,
      ServiceResponse.failure("Invalid CSRF token", null, 403)
    );
    return 
  }

  next();
}
