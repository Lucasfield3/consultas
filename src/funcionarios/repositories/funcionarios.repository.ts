import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';
import { FuncionarioEntity } from '../entities/funcionario.entity';

@Injectable()
export class FuncionariosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFuncionarioDto): Promise<FuncionarioEntity> {
    return this.prisma.funcionario.create({
      data,
    });
  }

  async findOne(id: string, nome?: string): Promise<FuncionarioEntity> {
    const funcionario = await this.prisma.funcionario.findFirst({
      where: {
        AND: [
          {
            id: id ? id : undefined,
          },
          {
            nome: nome,
          },
        ],
      },
    });

    if (!funcionario) {
      throw new NotFoundException('funcionario não foi encontrado');
    }

    return funcionario;
  }

  async remove(id: string): Promise<FuncionarioEntity> {
    return this.prisma.funcionario.delete({
      where: { id },
    });
  }

  async findAll(): Promise<FuncionarioEntity[]> {
    return this.prisma.funcionario.findMany();
  }

  async finfById(id: string): Promise<FuncionarioEntity> {
    return this.prisma.funcionario.findFirst({ where: { id } });
  }
}
