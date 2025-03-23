import {
  IsNotEmpty,
  Length,
  Matches,
  Max,
  Min,
  ValidateIf,
} from "class-validator";

export class AuthorValidate {
  @IsNotEmpty({ message: "O nome do autor é necessário" })
  @Max(150, {
    message: "O nome do autor tem que possuir menos de 150 caracteres",
  })
  @Min(3, { message: "O nome do autor tem que possuir mais de 3 caracteres" })
  name: string;

  @IsNotEmpty({ message: "A data de nascimento do autor é necessária" })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "A data de nascimento está inválida",
  })
  @Length(0, 20, {
    message: "A data de nascimento está muito grande",
  })
  birth_date: string;

  @ValidateIf((obj) => obj.death_date !== null && obj.death_date !== undefined)
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "A data de falecimento está inválida",
  })
  @Length(0, 20, {
    message: "A data de falecimento está muito grande",
  })
  death_date: string;

  @IsNotEmpty({ message: "A data nacionalidade do autor é necessária" })
  nationality: string;

  bio: string;

  photo: string;
}

export type AuthorDTO = InstanceType<typeof AuthorValidate>;
