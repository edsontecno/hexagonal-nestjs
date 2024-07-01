import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  preco: number;

  @ApiProperty()
  imagem: string;

  @ApiProperty()
  categoria: number;
}
