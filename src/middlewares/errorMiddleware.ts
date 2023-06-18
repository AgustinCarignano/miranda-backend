import { CustomError } from "../utils/error/customError";
import { NextFunction, Request, Response } from "express";

export async function handleError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (!(err instanceof CustomError)) {
    if (err.message === "Unauthorized") {
      return res.status(401).json({
        description:
          "Missing or incorrect token. Unauthorized to access to this endpoint",
      });
    }
    return res.status(500).json({ description: err.message });
  }
  if (err.status) {
    err.httpCode = err.status;
  }
  res.status(err.httpCode).json({ description: err.message });
}
