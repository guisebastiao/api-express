import { NextFunction, Request, Response } from "express";
import { BookDTO } from "@/DTO/BookDTO";
import { BookService } from "@/services/BookService";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  public async create(
    req: Request<{}, {}, BookDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const book = await this.bookService.create(req.body);

      const response: ResponseBodyInterface = {
        statusCode: 201,
        message: "O livro " + book.title + " foi criado com sucesso",
      };

      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
}
