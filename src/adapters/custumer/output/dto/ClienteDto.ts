import { ApiProperty } from '@nestjs/swagger';

export class CustomerDTO {
  @ApiProperty()
  nome?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;
}
