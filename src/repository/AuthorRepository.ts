import { authors, PrismaClient } from "@prisma/client";
import prismaDatabase from "@/database/prisma";
import { AuthorDTO } from "@/DTO/AuthorDTO";

export class AuthorRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaDatabase;
  }

  public async create(dto: AuthorDTO): Promise<authors> {
    return await this.prisma.authors.create({
      data: { ...dto },
    });
  }

  public async findById(id: string): Promise<authors | null> {
    return await this.prisma.authors.findUnique({
      where: {
        id,
      },
    });
  }
}
