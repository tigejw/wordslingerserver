import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.StatusCode).json(error.serialize());
  }
  return res.status(400).json({ message: "Bad Request" });
};
