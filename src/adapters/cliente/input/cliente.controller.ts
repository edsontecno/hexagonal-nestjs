import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ClienteServicePort } from 'src/application/cliente/ports/input/ClienteServicePort';
import { Cliente } from 'src/application/cliente/core/domain/Cliente';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClienteDTO } from '../output/dto/ClienteDto';
import { ErrorResponseBody } from 'src/filtros/filtro-de-excecao-global';
import { Response } from 'express';

@Controller('cliente')
@ApiTags('Cliente')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class ClienteController {
  constructor(private readonly adapter: ClienteServicePort) {}
  @Post()
  @ApiOperation({ summary: 'Criar cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente salvo',
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor' })
  async criaUsuario(@Body() dadosDoUsuario: ClienteDTO) {
    const cliente = new Cliente();
    Object.assign(cliente, dadosDoUsuario);
    await this.adapter.saveCliente(cliente);
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
  @ApiOperation({ summary: 'Excluir cliente' })
  @ApiResponse({
    status: 204,
    description: 'Excluir cliente por cpf',
  })
  async deleteClienteByCpf(
    @Param('cpf') cpf: string,
    @Res() response: Response,
  ) {
    await this.adapter.deleteCliente(cpf);
    return response.status(HttpStatus.NO_CONTENT).json();
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
