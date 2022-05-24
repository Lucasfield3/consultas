import { Paciente } from '@prisma/client';
export class PacienteEntity implements Paciente {
  id: string;
  nome: string;
  telefone: string;
}
