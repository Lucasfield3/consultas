import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultasModule } from './consultas/consultas.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConsultasModule, PacientesModule, FuncionariosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
