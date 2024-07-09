import { ApiProperty } from '@nestjs/swagger';
import { ProdutoPedidoDTO } from './produto-pedido.dto';

export class ItemPedidoConsultaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantidade: number;

  @ApiProperty()
  precoVenda: number;

  @ApiProperty()
  produto: ProdutoPedidoDTO;
}
