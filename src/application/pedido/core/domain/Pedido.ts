import { ItemPedido } from './ItemPedido';
import { StatusPedido } from './StatusPedido';

export class Pedido {
  itens: [ItemPedido];
  clienteId: string;
  status: StatusPedido;
}
