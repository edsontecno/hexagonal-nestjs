import { Provider } from '@nestjs/common';
import { PedidoPersistPort } from 'src/application/pedido/ports/output/PedidoPersistPort';
import { PedidoPersistAdapter } from './PedidoPersitAdapter';

export const PedidoOutput: Provider[] = [
  {
    provide: PedidoPersistPort,
    useClass: PedidoPersistAdapter,
  },
];
