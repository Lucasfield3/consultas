import { Funcionario } from '@prisma/client';

export class FuncionarioEntity implements Funcionario {
  id: string;
  nome: string;
  hash_senha: string;
}
