import { ApiProperty } from '@nestjs/swagger';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  itens: OrderItemDto[];

  @ApiProperty()
  customerId: string;
}
