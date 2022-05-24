import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PacientesRepository } from './repositories/pacientes.repository';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService, PrismaService, PacientesRepository],
})
export class PacientesModule {}
