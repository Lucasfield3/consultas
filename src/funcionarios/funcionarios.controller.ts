import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Post('signup')
  signup(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.signUp(createFuncionarioDto);
  }

  @Post('signin')
  sigin(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.signin(createFuncionarioDto);
  }

  @Get()
  findAll() {
    return this.funcionariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionariosService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
  //   return this.funcionariosService.update(+id, updateFuncionarioDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionariosService.remove(id);
  }
}
