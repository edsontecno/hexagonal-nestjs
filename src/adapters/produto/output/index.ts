import { Provider } from '@nestjs/common';
import { ProdutoPersistPort } from 'src/application/produto/ports/output/ProdutoPersistPort';
import { ProdutoPersistAdapter } from './ProdutoPersitAdapter';

export const ProdutoOutput: Provider[] = [
  {
    provide: ProdutoPersistPort,
    useClass: ProdutoPersistAdapter,
  },
];
