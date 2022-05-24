import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { FuncionarioEntity } from 'src/funcionarios/entities/funcionario.entity';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../model/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<FuncionarioEntity> {
    const funcionario = await this.authService.validateUser(jwtPayload);

    if (!funcionario) {
      throw new UnauthorizedException('Veio do strategy');
    }

    return funcionario;
  }
}
