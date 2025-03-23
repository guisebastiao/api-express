import { genres, PrismaClient } from "@prisma/client";
import prismaDatabase from "@/database/prisma";
import { GenreDTO } from "@/DTO/GenreDTO";

export class GenreRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaDatabase;
  }

  public async create(dto: GenreDTO): Promise<genres> {
    return await this.prisma.genres.create({
      data: { ...dto },
    });
  }

  public async findById(id: number): Promise<genres | null> {
    return await this.prisma.genres.findUnique({
      where: {
        id,
      },
    });
  }

  public async findByName(name: string): Promise<genres | null> {
    return await this.prisma.genres.findUnique({
      where: {
        name,
      },
    });
  }
}
