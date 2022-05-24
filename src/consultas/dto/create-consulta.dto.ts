import { IsString, IsNotEmpty } from 'class-validator';

export class CreateConsultaDto {
  @IsString()
  @IsNotEmpty()
  pacienteTel: string;

  data?: string;
}
