import { Response } from "express";
import { ServiceResponse } from "./serviceResponse";

export const respond = <T>(
  res: Response,
  serviceResponse: ServiceResponse<T>
) => {
  return res.status(serviceResponse.statusCode).json(serviceResponse);
};
