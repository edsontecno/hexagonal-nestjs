import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  descricao: string;
}
