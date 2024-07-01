import { Provider } from '@nestjs/common';
import { ProdutoService } from 'src/application/produto/core/service/ProdutoService';
import { ProdutoServicePort } from 'src/application/produto/ports/input/ProdutoServicePort';

export const ProdutoInput: Provider[] = [
  {
    provide: ProdutoServicePort,
    useClass: ProdutoService,
  },
];
