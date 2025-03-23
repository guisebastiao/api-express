import { ResponseBodyInterface } from "@/DTO/ResponseBody";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { GenreRepository } from "@/repository/GenreRepository";
import { GenreDTO } from "@/DTO/GenreDTO";
import { genres } from "@prisma/client";

export class GenreService {
  private genreRepository: GenreRepository;

  constructor() {
    this.genreRepository = new GenreRepository();
  }

  public async create(dto: GenreDTO): Promise<genres> {
    const genre = await this.genreRepository.findByName(dto.name);

    if (genre != null) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 409,
        message: "Esse gênero já existe",
      };

      throw new ServerErrorHandler(responseBody);
    }

    return await this.genreRepository.create(dto);
  }
}
