import { Body, Controller, Post } from '@nestjs/common';
import { ClienteServicePort } from 'src/application/cliente/ports/input/ClienteServicePort';
import { Cliente } from 'src/application/cliente/core/domain/Cliente';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly adapter: ClienteServicePort) {}
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: Cliente) {
    return await this.adapter.saveCliente(dadosDoUsuario);
  }
}
