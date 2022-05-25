import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePacienteDto } from '../dto/create-paciente.dto';
import { PacienteEntity } from '../entities/paciente.entity';

@Injectable()
export class PacientesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePacienteDto): Promise<PacienteEntity> {
    return this.prisma.paciente.create({
      data,
      include: {
        consulta: {
          select: {
            id: true,
            data: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<PacienteEntity> {
    return this.prisma.paciente.findUnique({
      where: {
        id,
      },
      include: {
        consulta: {
          select: {
            id: true,
            data: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<PacienteEntity[]> {
    return this.prisma.paciente.findMany({
      include: {
        consulta: {
          select: {
            id: true,
            data: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<PacienteEntity> {
    return this.prisma.paciente.delete({
      where: { id },
    });
  }
}
