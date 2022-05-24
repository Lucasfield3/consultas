import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FuncionariosRepository } from 'src/funcionarios/repositories/funcionarios.repository';
import { FuncionarioEntity } from 'src/funcionarios/entities/funcionario.entity';
import { JwtPayload } from './model/jwt-payload.model';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly funcionariosRepository: FuncionariosRepository,
  ) {}

  public async createAccessToken(funcionarioId: string): Promise<string> {
    return sign({ funcionarioId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public async validateUser(
    jwtPayload: JwtPayload,
  ): Promise<FuncionarioEntity> {
    const user = await this.funcionariosRepository.findOne(
      jwtPayload.funcionarioId,
    );

    if (!user) {
      throw new UnauthorizedException('employee not found');
    }

    return user;
  }

  private static jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad request!');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return AuthService.jwtExtractor;
  }
}
