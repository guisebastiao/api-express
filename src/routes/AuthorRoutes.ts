import { AuthorController } from "@/controllers/AuthorController";
import { validateDTO } from "@/middlewares/validateDTO";
import loginRequired from "@/middlewares/loginRequired";
import { AuthorValidate } from "@/DTO/AuthorDTO";
import { Router } from "express";

export class AuthorRoutes {
  private authorController: AuthorController;
  private router: Router;

  constructor() {
    this.authorController = new AuthorController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      loginRequired,
      validateDTO(AuthorValidate),
      this.authorController.create.bind(this.authorController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
