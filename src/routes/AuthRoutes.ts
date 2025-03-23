import { AuthController } from "@/controllers/AuthController";
import { validateDTO } from "@/middlewares/validateDTO";
import { LoginValidate, RegisterValidate } from "@/DTO/AuthDTO";
import { Router } from "express";

export class AuthRoutes {
  private authController: AuthController;
  private router: Router;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/login",
      validateDTO(LoginValidate),
      this.authController.login.bind(this.authController)
    );

    this.router.post(
      "/register",
      validateDTO(RegisterValidate),
      this.authController.register.bind(this.authController)
    );

    this.router.post(
      "/logout",
      this.authController.logout.bind(this.authController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
