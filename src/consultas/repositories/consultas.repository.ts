import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConsultaDto } from '../dto/create-consulta.dto';
import { UpdateConsultaDto } from '../dto/update-consulta.dto';
import { ConsultaEntity } from '../entities/consulta.entity';

@Injectable()
export class ConsultasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConsultaDto: CreateConsultaDto): Promise<ConsultaEntity> {
    const { pacienteTel } = createConsultaDto;

    delete createConsultaDto.pacienteTel;

    const paciente = await this.prisma.paciente.findFirst({
      where: { telefone: pacienteTel },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const data: Prisma.ConsultaCreateInput = {
      data: createConsultaDto.data,
      paciente: {
        connect: {
          id: paciente.id,
        },
      },
    };

    return this.prisma.consulta.create({
      data,
      include: {
        paciente: {
          select: {
            nome: true,
            telefone: true,
          },
        },
      },
    });
  }

  async update(
    updateConsultaDto: UpdateConsultaDto,
    id: string,
  ): Promise<ConsultaEntity> {
    const { pacienteTel } = updateConsultaDto;

    if (!pacienteTel) {
      return this.prisma.consulta.update({
        where: { id },
        data: updateConsultaDto,
        include: {
          paciente: {
            select: {
              nome: true,
              telefone: true,
            },
          },
        },
      });
    }

    const paciente = await this.prisma.paciente.findFirst({
      where: {
        telefone: pacienteTel,
      },
    });

    const data: Prisma.ConsultaUpdateInput = {
      ...updateConsultaDto,
      paciente: {
        connect: {
          id: paciente.id,
        },
      },
    };

    return this.prisma.consulta.update({
      where: { id },
      data,
      include: {
        paciente: {
          select: {
            nome: true,
            telefone: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<ConsultaEntity> {
    return this.prisma.consulta.findUnique({
      where: { id },
      include: {
        paciente: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  async findByPaciente(telefone: string): Promise<ConsultaEntity> {
    return this.prisma.consulta.findFirst({
      where: {
        paciente: {
          telefone,
        },
      },
    });
  }

  async findByData(data: string): Promise<ConsultaEntity> {
    return this.prisma.consulta.findFirst({
      where: {
        data,
      },
    });
  }

  async remove(id: string): Promise<ConsultaEntity> {
    return this.prisma.consulta.delete({
      where: { id },
    });
  }
}
