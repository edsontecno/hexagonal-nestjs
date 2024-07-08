import { Injectable } from '@nestjs/common';
import { PedidoServicePort } from '../../ports/input/PedidoServicePort';
import { PedidoPersistPort } from '../../ports/output/PedidoPersistPort';
import { Pedido } from '../domain/Pedido';
import { PedidoProcessado } from '../domain/PedidoProcessado';
import { StatusPedido } from '../domain/StatusPedido';
import { ItemPedido } from '../domain/ItemPedido';
import { RegraNegocioException } from 'src/filtros/RegraNegocioException';

@Injectable()
export class PedidoService implements PedidoServicePort {
  constructor(private persist: PedidoPersistPort) {}

  async save(pedido: Pedido): Promise<number> {
    const pedidoProcessado = new PedidoProcessado();
    pedidoProcessado.status = StatusPedido.Pendente;
    pedidoProcessado.total = 0;
    pedidoProcessado.itens = [];

    if (pedido.clienteId) {
      const cliente = await this.persist.getCliente(pedido.clienteId);
      if (cliente.id === undefined) {
        throw new RegraNegocioException(
          'Cliente informado não existe na base de dados',
        );
      }
      pedidoProcessado.clienteId = cliente.id;
    }

    if (pedido.itens.length < 1) {
      throw new RegraNegocioException(
        'Nenhum produto foi adicionado ao pedido',
      );
    }

    await this.processarItemPedido(pedido, pedidoProcessado);

    const pedidoId = await this.persist.save(pedidoProcessado);
    this.processPayment(pedidoId);

    return pedidoId;
  }

  private async processarItemPedido(
    pedido: Pedido,
    pedidoProcessado: PedidoProcessado,
  ) {
    for (const element of pedido.itens) {
      if (!element.produtoId) {
        throw new RegraNegocioException('Por favor informe o produto desejado');
      }
      const produto = await this.persist.getProdutoById(element.produtoId);
      if (produto.id === undefined) {
        throw new RegraNegocioException(
          `O produto com id '${element.produtoId}' não existe na base de dados`,
        );
      }
      if (!element.quantidade || element.quantidade < 1) {
        throw new RegraNegocioException(
          'A quantidade mínima de um produto é 1',
        );
      }
      const newItem = new ItemPedido();
      newItem.produtoId = element.produtoId;
      newItem.quantidade = element.quantidade;
      newItem.precoVenda = parseFloat(produto.preco) * element.quantidade;
      pedidoProcessado.itens.push(newItem);
      pedidoProcessado.total += newItem.precoVenda;
    }
  }

  getAllByStatus(status): Promise<Pedido[]> {
    return this.persist.getAllByStatus(status);
  }

  async processPayment(pedidoId: number) {
    console.log('Processando pagamento....');
    await this.awaitPayment();
    console.log('Pagamento processado');
    this.persist.changeStatusPedido(pedidoId, StatusPedido.PagamentoProcessado);
  }

  awaitPayment() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 30000);
    });
  }

  async changeStatus(id: number, status: StatusPedido) {
    await this.persist.changeStatus(id, status);
    return 'Pedido alterado';
  }

  getPedidoByCliente(cpf: any): Promise<Pedido[]> {
    return this.persist.getPedidosByCliente(cpf);
  }
}
