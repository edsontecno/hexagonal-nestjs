import { Pedido } from '../../core/domain/Pedido';

export abstract class PedidoServicePort {
  abstract save(pedido: Pedido): Promise<number>;
}
