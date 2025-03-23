import {
  IsNotEmpty,
  Length,
  Max,
  Min,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsInt,
  IsUUID,
} from "class-validator";

@ValidatorConstraint({ name: "IsISBNValid", async: false })
class IsISBNValid implements ValidatorConstraintInterface {
  validate(isbn: string) {
    const cleanIsbn = isbn.replace(/-/g, "");

    const isbn10Regex = /^(?:\d{9}[\dXx]|\d{10})$/;
    const isbn13Regex = /^(?:\d{13})$/;

    return isbn10Regex.test(cleanIsbn) || isbn13Regex.test(cleanIsbn);
  }

  defaultMessage() {
    return "O ISBN está inválido";
  }
}

export class BookValidate {
  @IsNotEmpty({ message: "Por favor, informe o titulo do livro" })
  @Length(0, 250, {
    message: "O título do livro não pode possuir mais do que 250 caracteres",
  })
  title: string;

  @IsUUID(4, { message: "O ID do autor deve ser um UUID" })
  author_id: string;

  @Validate(IsISBNValid, {
    message: "O ISBN está inválido",
  })
  isbn: string;

  @IsNotEmpty({ message: "Por favor, informe a data de publicação do livro" })
  @Max(new Date().getFullYear(), {
    message: "O ano da publicação não pode ser maior que o ano atual",
  })
  published_year: number;

  @IsInt({ message: "O ID do gênero deve ser um número inteiro" })
  @Min(1, { message: "O ID do gênero tem que ser maior que um" })
  genre_id: number;

  @IsNotEmpty({ message: "Por favor, informe a linguagem do livro" })
  @Length(0, 100, {
    message: "A linguagem do livro não pode ser maior do que 100 caracteres",
  })
  language: string;
}

export type BookDTO = InstanceType<typeof BookValidate>;
