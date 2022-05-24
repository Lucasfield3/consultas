import { Consulta } from '@prisma/client';

export class ConsultaEntity implements Consulta {
  id: string;
  data: Date;
  pacienteId: string;
}
