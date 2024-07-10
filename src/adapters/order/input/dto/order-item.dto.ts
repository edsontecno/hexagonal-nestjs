import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantidade: number;
}