import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "./serviceResponse";

export const validateRequest =
  (schema: ZodSchema) =>
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
        res.status(statusCode).json(serviceResponse);
        return;
      }

      // fallback if error is not from Zod
      const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      const serviceResponse = ServiceResponse.failure(
        "Internal server error during validation",
        null,
        statusCode
      );
      res.status(statusCode).json(serviceResponse);
    }
  };
