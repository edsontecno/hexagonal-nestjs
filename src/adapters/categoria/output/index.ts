import { Provider } from '@nestjs/common';
import { CategoriaPersistPort } from 'src/application/categoria/ports/output/CategoriaPersistPort';
import { CategoriaPersistAdapter } from './CategoriaPersitAdapter';

export const CategoriaOutput: Provider[] = [
  {
    provide: CategoriaPersistPort,
    useClass: CategoriaPersistAdapter,
  },
];
