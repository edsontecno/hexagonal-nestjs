import { ApiProperty } from '@nestjs/swagger';
import { ClientePedidoDTO } from './cliente-pedido.dto';
import { ItemPedidoConsultaDto } from './item-pedido-consulta.dto';
// import { ItemPedidoDto } from './item-pedido.dto';

export class PedidoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ type: [ItemPedidoConsultaDto] })
  itensPedido: ItemPedidoConsultaDto[];

  @ApiProperty()
  cliente: ClientePedidoDTO;
}
