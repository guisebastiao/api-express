import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "@/DTO/AuthDTO";
import { AuthService } from "@/services/AuthService";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";
import { tokenExpirate } from "@/config/env";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(
    req: Request<{}, {}, LoginDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = await this.authService.login(req.body);

      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: Number(tokenExpirate),
      });

      const response: ResponseBodyInterface = {
        statusCode: 200,
        message: "Login bem sucedido",
      };

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async register(
    req: Request<{}, {}, RegisterDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.authService.register(req.body);

      const response: ResponseBodyInterface = {
        statusCode: 201,
        message: "Cadastro realizado com sucesso",
      };

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async logout(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.clearCookie("token");

      const response: ResponseBodyInterface = {
        statusCode: 200,
        message: "Logout bem sucedido",
      };

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
}
