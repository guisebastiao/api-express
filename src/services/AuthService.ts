import { RegisterDTO } from "@/DTO/AuthDTO";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { AuthRepository } from "@/repository/AuthRepository";
import bcrypt from "bcryptjs";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public register(dto: RegisterDTO) {
    const user = this.authRepository.findUserByEmail(dto.email);

    if (user != null) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 409,
        message: "Esse usuário já está cadastrado",
      };

      throw new ServerErrorHandler(responseBody);
    }

    const passwordHashed = bcrypt.hashSync(dto.password, 10);

    const newDto = {
      ...dto,
      password: passwordHashed,
    };

    this.authRepository.create(newDto);
  }
}
