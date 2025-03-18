import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const port = process.env.PORT;
    return `Servidor rodando na porta ${port}`;
  }
}