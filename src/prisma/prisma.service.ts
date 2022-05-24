import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      if (params.action === 'create' && params.model === 'Funcionario') {
        const funcionario = params.args.data;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(funcionario.hash_senha, salt);
        funcionario.hash_senha = hash;
        params.args.data = funcionario;
      }

      if (params.action === 'findUnique' && params.model === 'Funcionario') {
        const funcionario = params.args.data;
        if (!funcionario.id) {
          return next(params);
        }
      }
      return next(params);
    });
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
