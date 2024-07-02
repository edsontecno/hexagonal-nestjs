import { ApiProperty } from '@nestjs/swagger';
import { ItemPedidoDto } from './item-pedido.dto';

export class CreatePedidoDto {
  @ApiProperty({ type: [ItemPedidoDto] })
  itens: ItemPedidoDto[];

  @ApiProperty()
  clienteId: number;
}
