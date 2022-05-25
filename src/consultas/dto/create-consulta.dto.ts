import { IsString, IsNotEmpty } from 'class-validator';

export class CreateConsultaDto {
  @IsString()
  @IsNotEmpty()
  pacienteTel: string;

  pacienteId: string;

  @IsString()
  @IsNotEmpty()
  pacienteNome: string;

  @IsNotEmpty()
  data: string;
}
