import { CreatePedidoDto } from './dto/create-pedido.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PedidoServicePort } from 'src/application/pedido/ports/input/PedidoServicePort';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseBody } from 'src/filtros/filtro-de-excecao-global';
import { Pedido } from 'src/application/pedido/core/domain/Pedido';
import { PedidoDto } from './dto/pedito.dto';
import { Response } from 'express';
import { MessageDTO } from 'src/adapters/dto/message.dto';

@ApiTags('Pedido')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
@Controller('pedido')
export class PedidoController {
  constructor(private readonly adapter: PedidoServicePort) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Pedido salvo',
  })
  async save(@Body() pedidoDto: CreatePedidoDto) {
    const pedido = new Pedido();
    Object.assign(pedido, pedidoDto);
    await this.adapter.save(pedido);
  }

  @Get('/status/:status')
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por status',
    type: [PedidoDto],
  })
  getAll(@Param('status') status: string) {
    return this.adapter.getAllByStatus(status);
  }

  @Get('/cliente/:cpf')
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por status',
    type: [PedidoDto],
  })
  getPedidoByCliente(@Param('cpf') cpf: string) {
    return this.adapter.getPedidoByCliente(cpf);
  }

  @Put(':id/alterar_status/:status')
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos por status',
    type: MessageDTO,
  })
  async changeStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    @Res() response: Response,
  ) {
    const result = await this.adapter.changeStatus(id, status);
    return response.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Get('status')
  @ApiResponse({
    status: 200,
    description: 'Lista de status disponíveis para o pedido',
    type: [String],
  })
  async getListStatus() {
    return await this.adapter.getListStatus();
  }
}
