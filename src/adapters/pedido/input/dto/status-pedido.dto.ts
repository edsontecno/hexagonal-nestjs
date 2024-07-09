import { ApiProperty } from '@nestjs/swagger';

export class StatusPedidoDTO {
  @ApiProperty()
  nome?: string;
}
