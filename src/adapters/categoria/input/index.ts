import { Provider } from '@nestjs/common';
import { CategoriaService } from 'src/application/categoria/core/service/CategoriaService';
import { CategoriaServicePort } from 'src/application/categoria/ports/input/CategoriaServicePort';

export const CategoriaInput: Provider[] = [
  {
    provide: CategoriaServicePort,
    useClass: CategoriaService,
  },
];
