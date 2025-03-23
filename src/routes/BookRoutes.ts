import { BookController } from "@/controllers/BookController";
import { validateDTO } from "@/middlewares/validateDTO";
import loginRequired from "@/middlewares/loginRequired";
import { BookValidate } from "@/DTO/BookDTO";
import { Router } from "express";

export class BookRoutes {
  private bookController: BookController;
  private router: Router;

  constructor() {
    this.bookController = new BookController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      loginRequired,
      validateDTO(BookValidate),
      this.bookController.create.bind(this.bookController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
