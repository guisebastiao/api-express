import { LoginDTO, RegisterDTO } from "@/DTO/AuthDTO";
import { ResponseBodyInterface } from "@/DTO/ResponseBody";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { AuthRepository } from "@/repository/AuthRepository";
import { tokenExpirate, tokenSecret } from "@/config/env";
import { users } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async login(dto: LoginDTO): Promise<string | undefined> {
    const user = await this.authRepository.findUserByEmail(dto.email);

    if (!user) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 400,
        message: "Esse usuário não está cadastrado",
      };

      throw new ServerErrorHandler(responseBody);
    }

    const isPasswordCorrect = bcrypt.compareSync(dto.password, user.password);

    if (!isPasswordCorrect) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 401,
        message: "Sua senha está incorreta",
      };

      throw new ServerErrorHandler(responseBody);
    }

    const token = jwt.sign({ id: user.id }, tokenSecret, {
      expiresIn: Number(tokenExpirate),
    });

    return token;
  }

  public async register(dto: RegisterDTO): Promise<users> {
    const user = await this.authRepository.findUserByEmail(dto.email);

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

    return this.authRepository.create(newDto);
  }
}
