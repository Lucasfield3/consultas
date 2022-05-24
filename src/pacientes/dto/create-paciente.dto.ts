import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;
}
