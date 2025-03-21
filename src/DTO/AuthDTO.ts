import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

export class LoginValidate {
  @IsNotEmpty({ message: "O e-mail é obrigatório" })
  @Length(0, 250, { message: "O e-mail não pode ultrapassar 250 caracteres" })
  @IsEmail({}, { message: "E-mail inválido" })
  email: string;

  @IsNotEmpty({ message: "A senha é obrigatória" })
  @Length(8, 20, { message: "A senha deve possuir entre 8 e 20 caracteres" })
  @Matches(/\d.*\d/, {
    message: "A senha deve possuir pelo menos dois números",
  })
  @Matches(/[A-Z]/, {
    message: "A senha deve possuir pelo menos uma letra maiúscula",
  })
  @Matches(/[@#$%&*]/, {
    message: "A senha deve possuir pelo menos um caractere especial",
  })
  password: string;
}

export class RegisterValidate extends LoginValidate {
  @IsNotEmpty({ message: "Seu nome é obrigatório" })
  @Length(3, 100, { message: "Seu nome deve possuir de 3 á 50 caracteres" })
  name: string;
}

export type LoginDTO = InstanceType<typeof LoginValidate>;
export type RegisterDTO = InstanceType<typeof RegisterValidate>;
