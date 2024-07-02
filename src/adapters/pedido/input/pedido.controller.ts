import { Body, Controller, Post } from '@nestjs/common';
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
}
