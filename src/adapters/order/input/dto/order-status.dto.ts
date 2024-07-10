import { ApiProperty } from '@nestjs/swagger';

export class OrderStatusDTO {
  @ApiProperty()
  nome?: string;
}
