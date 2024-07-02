import { ApiProperty } from '@nestjs/swagger';

export class ItemPedidoDto {
  @ApiProperty()
  produtoId: number;

  @ApiProperty()
  quantidade: number;
}
