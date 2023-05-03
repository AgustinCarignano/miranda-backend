import { CustomError } from "@src/utils/error/customError";
import { NextFunction, Request, Response } from "express";

export async function handleError(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.status) {
    err.httpCode = err.status;
    if (err.message === "Unauthorized") {
      err.message =
        "Missing or incorrect token. Unauthorized to access to this endpoint";
    }
  }
  res.status(err.httpCode).json({ description: err.message });
}
