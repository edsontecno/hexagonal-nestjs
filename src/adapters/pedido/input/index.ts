import { Provider } from '@nestjs/common';
import { PedidoService } from 'src/application/pedido/core/service/PedidoService';
import { PedidoServicePort } from 'src/application/pedido/ports/input/PedidoServicePort';

export const PedidoInput: Provider[] = [
  {
    provide: PedidoServicePort,
    useClass: PedidoService,
  },
];
