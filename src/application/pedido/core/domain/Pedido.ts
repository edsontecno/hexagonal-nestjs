'use strict';

import { ItemPedido } from './ItemPedido';
import { StatusPedido } from './StatusPedido';

export class Pedido {
  readonly itens: [ItemPedido];
  readonly clienteId: string;
  readonly status: StatusPedido;
  readonly awaitTime: string;
}
