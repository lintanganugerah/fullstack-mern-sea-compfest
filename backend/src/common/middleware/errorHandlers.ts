import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "../utils/serviceResponse"; // adjust path sesuai struktur lo

const unexpectedRequest: RequestHandler = (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json(
      ServiceResponse.failure(
        `Route ${req.method} ${req.originalUrl} not found`,
        null,
        StatusCodes.NOT_FOUND
      )
    );
};

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};

export default (): [RequestHandler, ErrorRequestHandler] => [
  unexpectedRequest,
  addErrorToRequestLog,
];
