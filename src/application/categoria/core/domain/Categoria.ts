import { Produto } from 'src/application/produto/core/domain/Produto';

export class Categoria {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly produtos: Produto[];
}
