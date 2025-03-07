import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof CustomError) {
    res.status(error.StatusCode).json(error.serialize());
  } else res.status(404).send({ message: "Not Found" });
};
