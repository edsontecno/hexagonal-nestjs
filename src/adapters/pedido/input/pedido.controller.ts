import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PedidoServicePort } from 'src/application/pedido/ports/input/PedidoServicePort';
import { CreatePedidoDto } from '../input/dto/create-pedido.dto';
import { Pedido } from 'src/application/pedido/core/domain/Pedido';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly adapter: PedidoServicePort) {}

  @Post()
  save(@Body() pedidoDto: CreatePedidoDto) {
    const pedido = new Pedido();
    Object.assign(pedido, pedidoDto);

    return this.adapter.save(pedido);
  }

  @Get('/status/:status')
  getAll(@Param('status') status: string) {
    return this.adapter.getAllByStatus(status);
  }

  @Get('/cliente/:cpf')
  getPedidoByCliente(@Param('cpf') cpf: string) {
    return this.adapter.getPedidoByCliente(cpf);
  }

  @Put(':id/alterar_status/:status')
  changeStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.adapter.changeStatus(id, status);
  }
}
