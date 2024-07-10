import { Product } from 'src/application/product/core/domain/Product';

export class Category {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly products: Product[];
}
