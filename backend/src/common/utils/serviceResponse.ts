import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly success: boolean;
  readonly message?: string;
  readonly responseObject?: T;
  readonly statusCode: number;

  private constructor(
    success: boolean,
    message?: string | undefined,
    responseObject?: T | undefined,
    statusCode: number = StatusCodes.OK
  ) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }

  static success<T>(
    message?: string,
    responseObject?: T,
    statusCode: number = StatusCodes.OK
  ) {
    return new ServiceResponse(true, message, responseObject, statusCode);
  }

  static failure<T>(
    message?: string,
    responseObject?: T,
    statusCode: number = StatusCodes.BAD_REQUEST
  ) {
    return new ServiceResponse(false, message, responseObject, statusCode);
  }

  toJSON() {
    const json: Record<string, any> = {
      success: this.success,
    };
    if (this.message !== undefined) json.message = this.message;
    if (this.responseObject !== undefined)
      json.responseObject = this.responseObject;
    return json;
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string().optional(),
    responseObject: dataSchema.optional(),
  });
