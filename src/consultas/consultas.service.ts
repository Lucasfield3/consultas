import { Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { ConsultasRepository } from './repositories/consultas.repository';

@Injectable()
export class ConsultasService {
  constructor(private readonly consultasService: ConsultasRepository) {}
  create(createConsultaDto: CreateConsultaDto) {
    return this.consultasService.create(createConsultaDto);
  }

  findAll() {
    return this.consultasService.findAll();
  }

  findOne(id: string) {
    return this.consultasService.findOne(id);
  }

  update(updateConsultaDto: UpdateConsultaDto, id: string) {
    return this.consultasService.update(updateConsultaDto, id);
  }

  remove(id: string) {
    return this.consultasService.remove(id);
  }

  findByPaciente(telefone: string) {
    return this.consultasService.findByPaciente(telefone);
  }

  findByData(data: string) {
    return this.consultasService.findByData(data);
  }
}
