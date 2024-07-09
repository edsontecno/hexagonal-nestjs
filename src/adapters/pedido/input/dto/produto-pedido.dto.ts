import { ApiProperty } from '@nestjs/swagger';

export class ProdutoPedidoDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nome?: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  preco: number;

  @ApiProperty()
  image: string;
}
