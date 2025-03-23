import { NextFunction, Request, Response } from "express";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";

export const serverErrorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): undefined => {
  if (err instanceof ServerErrorHandler) {
    res.status(err.getResponse().statusCode).json(err.getResponse());
    return;
  }

  const response: ResponseBodyInterface = {
    statusCode: 500,
    message: "Algo deu errado, tente novamente mais tarde",
  };

  res.status(response.statusCode).json(response);
  return;
};
