import { Request, Response } from "express";
import { LoginDTO, RegisterDTO } from "@/DTO/AuthDTO";
import { AuthService } from "@/services/AuthService";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login(req: Request<{}, {}, LoginDTO>, res: Response): void {
    res.json(req.body);
  }

  public register(req: Request<{}, {}, RegisterDTO>, res: Response) {
    this.authService.register(req.body);

    const response: ResponseBodyInterface = {
      statusCode: 201,
      message: "Cadastro realizado com sucesso",
    };

    res.status(response.statusCode).json(response);
  }
}
