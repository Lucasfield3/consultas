import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConsultasRepository } from './repositories/consultas.repository';

@Module({
  controllers: [ConsultasController],
  providers: [ConsultasService, PrismaService, ConsultasRepository],
})
export class ConsultasModule {}
