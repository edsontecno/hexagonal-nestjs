import { Pedido } from '../../core/domain/Pedido';

export abstract class PedidoServicePort {
  abstract save(pedido: Pedido): Promise<number>;
  abstract getAllByStatus(status): Promise<Pedido[]>;
  abstract changeStatus(id, status): Promise<string>;
  abstract getPedidoByCliente(cpf): Promise<Pedido[]>;
}
