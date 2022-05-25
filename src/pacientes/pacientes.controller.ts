import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
  //   return this.pacientesService.update(+id, updatePacienteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(id);
  }
}
