import { ResponseBodyInterface } from "@/DTO/ResponseBody";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { AuthorRepository } from "@/repository/AuthorRepository";
import { AuthorDTO } from "@/DTO/AuthorDTO";
import { authors } from "@prisma/client";

export class AuthorService {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  public async create(dto: AuthorDTO): Promise<authors> {
    return this.authorRepository.create(dto);
  }
}
