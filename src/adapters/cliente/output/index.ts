import { Provider } from '@nestjs/common';
import { ClientePersistPort } from 'src/application/cliente/ports/output/ClientePersistPort';
import { ClientePersistAdapter } from './ClientePersitAdapter';

export const ServicesOutput: Provider[] = [
  {
    provide: ClientePersistPort,
    useClass: ClientePersistAdapter,
  },
];
