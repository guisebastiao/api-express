import { books, PrismaClient } from "@prisma/client";
import prismaDatabase from "@/database/prisma";
import { BookDTO } from "@/DTO/BookDTO";

export class BookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaDatabase;
  }

  public async create(dto: BookDTO): Promise<books> {
    return await this.prisma.books.create({
      data: { ...dto },
    });
  }

  public async findByIsbn(isbn: string): Promise<books | null> {
    return await this.prisma.books.findUnique({
      where: {
        isbn,
      },
    });
  }
}
