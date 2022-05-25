import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { PacientesRepository } from './repositories/pacientes.repository';

@Injectable()
export class PacientesService {
  constructor(private readonly pacientesRepository: PacientesRepository) {}
  create(createPacienteDto: CreatePacienteDto) {
    return this.pacientesRepository.create(createPacienteDto);
  }

  findAll() {
    return this.pacientesRepository.findAll();
  }

  findOne(id: string) {
    return this.pacientesRepository.findOne(id);
  }

  remove(id: string) {
    return this.pacientesRepository.remove(id);
  }
}
