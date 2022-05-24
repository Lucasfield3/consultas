import { Module } from '@nestjs/common';

import { FuncionariosController } from './funcionarios.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { FuncionariosRepository } from './repositories/funcionarios.repository';
import { FuncionariosService } from './funcionarios.service';

@Module({
  imports: [AuthModule],
  controllers: [FuncionariosController],
  providers: [FuncionariosService, PrismaService, FuncionariosRepository],
})
export class FuncionariosModule {}
