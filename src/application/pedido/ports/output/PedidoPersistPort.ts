import { Pedido } from './../../core/domain/Pedido';
import { StatusPedido } from './../../core/domain/StatusPedido';
import { Produto } from 'src/application/produto/core/domain/Produto';
import { PedidoProcessado } from '../../core/domain/PedidoProcessado';
import { Cliente } from 'src/application/cliente/core/domain/Cliente';

export abstract class PedidoPersistPort {
  abstract save(pedido: PedidoProcessado): Promise<number>;
  abstract getProdutoById(id: number): Promise<Produto>;
  abstract changeStatusPedido(id: number, status: StatusPedido);
  abstract getAllByStatus(status: StatusPedido);
  abstract changeStatus(id: number, status: StatusPedido): Promise<string>;
  abstract getPedidosByCliente(cpf: string): Promise<Pedido[]>;
  abstract getCliente(id: string): Promise<Cliente>;
}
