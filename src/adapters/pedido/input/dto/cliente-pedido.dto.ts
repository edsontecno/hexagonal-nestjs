import { ApiProperty } from '@nestjs/swagger';

export class ClientePedidoDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nome?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;
}
