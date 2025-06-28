import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/common/utils/serviceResponse";
import { respond } from "@/common/utils/responseHandler";
import { getEnv } from "@/common/config/envConfig";
import { createAuthService } from "@/api/v1/auth/service/auth.factory";
import { JwtPayload } from "@/api/v1/auth/types/auth.types";

const authService = createAuthService();

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      respond(
        res,
        ServiceResponse.failure(
          "Unauthorized: You are not logged in. Please login again",
          undefined,
          StatusCodes.UNAUTHORIZED
        )
      );
      return;
    }

    const token = authHeader.split(" ")[1]?.trim();
    if (!token) {
      respond(
        res,
        ServiceResponse.failure(
          "Unauthorized: You are not logged in",
          undefined,
          StatusCodes.UNAUTHORIZED
        )
      );
      return;
    }

    const decoded = jwt.verify(token, getEnv().JWT_SECRET) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err) {
    respond(
      res,
      ServiceResponse.failure(
        "Unauthorized: Token tidak valid",
        undefined,
        StatusCodes.UNAUTHORIZED
      )
    );
    return;
  }
};
