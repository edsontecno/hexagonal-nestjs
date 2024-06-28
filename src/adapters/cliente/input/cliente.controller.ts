import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClienteServicePort } from 'src/application/cliente/ports/input/ClienteServicePort';
import { Cliente } from 'src/application/cliente/core/domain/Cliente';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClienteDTO } from '../output/dto/ClienteDto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly adapter: ClienteServicePort) {}
  @Post()
  @ApiOperation({ summary: 'Criar cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente salvo',
  })
  async criaUsuario(@Body() dadosDoUsuario: ClienteDTO) {
    const cliente = new Cliente();
    Object.assign(cliente, dadosDoUsuario);

    return await this.adapter.saveCliente(cliente);
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'Consultar cliente' })
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: Cliente,
  })
  async getClienteByCpf(@Param('cpf') cpf: string) {
    return await this.adapter.getCliente(cpf);
  }

  @Delete(':cpf')
  @ApiOperation({ summary: 'Consultar cliente' })
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: Cliente,
  })
  async deleteClienteByCpf(@Param('cpf') cpf: string) {
    return await this.adapter.deleteCliente(cpf);
  }

  @Patch(':cpf')
  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: Cliente,
  })
  async updateClienteByCpf(
    @Param('cpf') cpf: string,
    @Body() dadosDoUsuario: ClienteDTO,
  ) {
    const cliente = new Cliente();
    Object.assign(cliente, dadosDoUsuario);

    return await this.adapter.updateCliente(cpf, cliente);
  }
}
