import { IsNotEmpty, Length } from "class-validator";

export class GenreValidate {
  @IsNotEmpty({ message: "Por favor, informe o nome do gênero" })
  @Length(0, 100, {
    message: "O nome do gênero não pode possuir mais do que 100 caracteres",
  })
  name: string;
}

export type GenreDTO = InstanceType<typeof GenreValidate>;
