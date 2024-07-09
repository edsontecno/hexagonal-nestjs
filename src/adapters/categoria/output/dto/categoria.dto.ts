import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-categoria.dto';

export class CategoriaDto extends CreateCategoriaDto {
  @ApiProperty()
  id: number;
}
