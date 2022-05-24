import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateFuncionarioDto {
  id?: string;
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  hash_senha: string;
}
