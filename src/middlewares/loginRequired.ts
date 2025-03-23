import { NextFunction, Request, Response } from "express";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";
import jwt, { JwtPayload } from "jsonwebtoken";
import { tokenSecret } from "@/config/env";
import prisma from "@/database/prisma";

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 403,
        message: "Você precisa fazer o login",
      };

      return next(new ServerErrorHandler(responseBody));
    }

    const decoded = jwt.verify(token, tokenSecret);

    const id = (decoded as JwtPayload).id;

    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 403,
        message: "Você precisa fazer o login",
      };

      return next(new ServerErrorHandler(responseBody));
    }

    req.id = id;

    return next();
  } catch (error) {
    const responseBody: ResponseBodyInterface = {
      statusCode: 403,
      message: "Sessão expirada, faça seu login",
    };

    return next(new ServerErrorHandler(responseBody));
  }
};
