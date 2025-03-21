import { NextFunction, Request, Response } from "express";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";

export const errorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    console.log("Oi");
    next();
  } catch (err) {
    console.log(err);
  }
};
