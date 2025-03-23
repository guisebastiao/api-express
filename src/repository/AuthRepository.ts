import { PrismaClient, users } from "@prisma/client";
import prismaDatabase from "@/database/prisma";
import { RegisterDTO } from "@/DTO/AuthDTO";

export class AuthRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaDatabase;
  }

  public async create(dto: RegisterDTO): Promise<users> {
    return await this.prisma.users.create({
      data: { ...dto },
    });
  }

  public async findUserByEmail(email: string): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
