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
import { AuthGuard } from '@nestjs/passport';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultasService.create(createConsultaDto);
  }

  @Get()
  findAll() {
    return this.consultasService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.consultasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultaDto: UpdateConsultaDto,
  ) {
    return this.consultasService.update(updateConsultaDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultasService.remove(id);
  }

  @Get('/filter/paciente/:telefone')
  findByPaciente(@Param('telefone') telefone: string) {
    return this.consultasService.findByPaciente(telefone);
  }

  @Get('/filter/consulta/:data')
  findByData(@Param('data') data: string) {
    return this.consultasService.findByData(data);
  }
}
