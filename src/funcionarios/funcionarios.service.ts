import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { FuncionarioEntity } from './entities/funcionario.entity';
import { FuncionariosRepository } from './repositories/funcionarios.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class FuncionariosService {
  constructor(
    private readonly funcionarioRepository: FuncionariosRepository,
    private readonly authService: AuthService,
  ) {}

  signUp(signUpDto: CreateFuncionarioDto) {
    return this.funcionarioRepository.create(signUpDto);
  }

  public async signin(
    createFuncionarioDto: CreateFuncionarioDto,
  ): Promise<{ name: string; jwtToken: string; senha: string }> {
    const funcionario = await this.funcionarioRepository.findOne(
      createFuncionarioDto.id,
    );
    const match = await this.checkPassword(
      createFuncionarioDto.hash_senha,
      funcionario,
    );

    if (!match) {
      throw new NotFoundException('Invalid credentials.');
    }

    const jwtToken = await this.authService.createAccessToken(funcionario.id);

    return { name: funcionario.nome, jwtToken, senha: funcionario.hash_senha };
  }

  private async checkPassword(
    password: string,
    funcionario: FuncionarioEntity,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, funcionario.hash_senha);

    if (!match) {
      throw new NotFoundException('Password not found');
    }

    return match;
  }

  // findAll() {
  //   return this.funcionarioRepository.findAll();
  // }

  // findOne(id: string) {
  //   return this.funcionarioRepository.findOne(id);
  // }

  // update(id: number, updateDto: UpdateDto) {
  //   return this.funcionarioRepository.update(id, updateDto);
  // }

  // remove(id: number) {
  //   return this.funcionarioRepository.removeOne(id);
  // }
}
