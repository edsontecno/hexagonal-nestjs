import { StatusPedido } from './StatusPedido';
import { ItemPedido } from './ItemPedido';

export class PedidoProcessado {
  itens?: ItemPedido[];
  clienteId: number;
  total: number;
  status: StatusPedido;
}
