import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "./serviceResponse";

export const validateRequest =
  (schema: ZodSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err: any) {
      if (err.name === "ZodError") {
        const zodError = err as ZodError;

        const detailedErrors = zodError.errors.map((e) => {
          return `${e.path.join(".")}: ${e.message}`;
        });

        const errorMessage = `Invalid input:\n${detailedErrors.join("\n")}`;
        const statusCode = StatusCodes.BAD_REQUEST;

        const serviceResponse = ServiceResponse.failure(
          errorMessage,
          null,
          statusCode
        );
        return res.status(statusCode).json(serviceResponse);
      }

      // fallback if error is not from Zod
      const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      const serviceResponse = ServiceResponse.failure(
        "Internal server error during validation",
        null,
        statusCode
      );
      return res.status(statusCode).json(serviceResponse);
    }
  };
