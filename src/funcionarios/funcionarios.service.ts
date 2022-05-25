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
    const funcionarioSearched = await this.funcionarioRepository.findOne(
      createFuncionarioDto.id,
      createFuncionarioDto.nome,
    );

    const match = await this.checkPassword(funcionarioSearched);

    if (!match) {
      throw new NotFoundException('Invalid credentials.');
    }

    const jwtToken = await this.authService.createAccessToken(
      funcionarioSearched.id,
    );

    return {
      name: funcionarioSearched.nome,
      jwtToken,
      senha: funcionarioSearched.hash_senha,
    };
  }

  private async checkPassword(
    funcionarioentity: FuncionarioEntity,
  ): Promise<boolean> {
    const passwordAccess = process.env.SENHA;
    const match = await bcrypt.compare(
      passwordAccess,
      funcionarioentity.hash_senha,
    );

    if (!match) {
      throw new NotFoundException('Password not found');
    }

    return match;
  }

  findAll() {
    return this.funcionarioRepository.findAll();
  }

  findOne(id: string) {
    return this.funcionarioRepository.finfById(id);
  }

  remove(id: string) {
    return this.funcionarioRepository.remove(id);
  }
}
