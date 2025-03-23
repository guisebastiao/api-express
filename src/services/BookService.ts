import { ResponseBodyInterface } from "@/DTO/ResponseBody";
import { ServerErrorHandler } from "@/exception/ServerErrorHandler";
import { AuthorRepository } from "@/repository/AuthorRepository";
import { GenreRepository } from "@/repository/GenreRepository";
import { BookRepository } from "@/repository/BookRepository";
import { BookDTO } from "@/DTO/BookDTO";
import { books } from "@prisma/client";

export class BookService {
  private bookRepository: BookRepository;
  private genreRepository: GenreRepository;
  private authorRepository: AuthorRepository;

  constructor() {
    this.bookRepository = new BookRepository();
    this.genreRepository = new GenreRepository();
    this.authorRepository = new AuthorRepository();
  }

  public async create(dto: BookDTO): Promise<books> {
    const book = await this.bookRepository.findByIsbn(dto.isbn);

    if (book != null) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 409,
        message: "Esse livro já existe",
      };

      throw new ServerErrorHandler(responseBody);
    }

    const author = await this.authorRepository.findById(dto.author_id);

    if (author == null) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 404,
        message: "O autor para esse livro não foi encontrado",
      };

      throw new ServerErrorHandler(responseBody);
    }

    const genre = await this.genreRepository.findById(dto.genre_id);

    if (genre == null) {
      const responseBody: ResponseBodyInterface = {
        statusCode: 404,
        message: "O gênero para esse livro não foi encontrado",
      };

      throw new ServerErrorHandler(responseBody);
    }

    return await this.bookRepository.create(dto);
  }
}
