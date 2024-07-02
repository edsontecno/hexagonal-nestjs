import { StatusPedido } from './../../core/domain/StatusPedido';
import { Produto } from 'src/application/produto/core/domain/Produto';
import { PedidoProcessado } from '../../core/domain/PedidoProcessado';

export abstract class PedidoPersistPort {
  abstract save(pedido: PedidoProcessado): Promise<number>;
  abstract getProdutoById(id: number): Promise<Produto>;
  abstract changeStatusPedido(id: number, status: StatusPedido);
}
