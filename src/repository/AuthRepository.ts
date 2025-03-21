import { PrismaClient, users } from "@prisma/client";
import prismaDatabase from "@/database/prisma";
import { RegisterDTO } from "@/DTO/AuthDTO";

export class AuthRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaDatabase;
  }

  public create(dto: RegisterDTO) {
    this.prisma.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
      },
    });
  }

  public findUserByEmail(email: string): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
