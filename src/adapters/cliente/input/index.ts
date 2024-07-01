import { Provider } from '@nestjs/common';
import { ClienteService } from 'src/application/cliente/core/service/ClienteService';
import { ClienteServicePort } from 'src/application/cliente/ports/input/ClienteServicePort';

export const Services: Provider[] = [
  {
    provide: ClienteServicePort,
    useClass: ClienteService,
  },
];
