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
    const { pacienteTel, pacienteId, pacienteNome } = createConsultaDto;

    delete createConsultaDto.pacienteTel;
    delete createConsultaDto.pacienteNome;

    const paciente = await this.prisma.paciente.findFirst({
      where: {
        AND: [
          {
            id: pacienteId ? pacienteId : undefined,
          },
          {
            nome: pacienteNome,
          },
          {
            telefone: pacienteTel,
          },
        ],
      },
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
    const { pacienteTel, pacienteNome, pacienteId } = updateConsultaDto;

    delete updateConsultaDto.pacienteTel;
    delete updateConsultaDto.pacienteNome;

    const paciente = await this.prisma.paciente.findFirst({
      where: {
        AND: [
          {
            id: pacienteId ? pacienteId : undefined,
          },
          {
            nome: pacienteNome,
          },
          {
            telefone: pacienteTel,
          },
        ],
      },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const data: Prisma.ConsultaUpdateInput = {
      ...updateConsultaDto,
      paciente: {
        connect: {
          id: paciente.id ? paciente.id : undefined,
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
    return this.prisma.consulta.findFirst({
      where: { id: id ? id : undefined },
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

  async findByPaciente(telefone: string): Promise<ConsultaEntity> {
    return this.prisma.consulta.findFirst({
      where: {
        paciente: {
          telefone,
        },
      },
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

  async findByData(data: string): Promise<ConsultaEntity> {
    return this.prisma.consulta.findFirst({
      where: {
        data,
      },
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

  async remove(id: string): Promise<ConsultaEntity> {
    return this.prisma.consulta.delete({
      where: { id },
    });
  }

  async findAll(): Promise<ConsultaEntity[]> {
    return this.prisma.consulta.findMany({
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
}
