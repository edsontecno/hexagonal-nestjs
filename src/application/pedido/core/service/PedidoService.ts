import { Injectable } from '@nestjs/common';
import { PedidoServicePort } from '../../ports/input/PedidoServicePort';
import { PedidoPersistPort } from '../../ports/output/PedidoPersistPort';
import { Pedido } from '../domain/Pedido';
import { PedidoProcessado } from '../domain/PedidoProcessado';
import { StatusPedido } from '../domain/StatusPedido';
import { ItemPedido } from '../domain/ItemPedido';
// import { ItemPedido } from '../domain/ItemPedido';

@Injectable()
export class PedidoService implements PedidoServicePort {
  constructor(private persist: PedidoPersistPort) {}

  async save(pedido: Pedido): Promise<number> {
    const pedidoProcessado = new PedidoProcessado();
    pedidoProcessado.status = StatusPedido.Pendente;
    pedidoProcessado.total = 0;
    pedidoProcessado.itens = [];
    // const itens = [];
    for (const element of pedido.itens) {
      const produto = await this.persist.getProdutoById(element.produtoId);
      const newItem = new ItemPedido();
      newItem.produtoId = element.produtoId;
      newItem.quantidade = element.quantidade;
      console.log(parseFloat(produto.preco) * element.quantidade);
      newItem.precoVenda = parseFloat(produto.preco) * element.quantidade;
      pedidoProcessado.itens.push(newItem);
      pedidoProcessado.total += newItem.precoVenda;
    }
    pedidoProcessado.clienteId = pedido.clienteId;

    const pedidoId = await this.persist.save(pedidoProcessado);
    this.processPayment(pedidoId);

    return pedidoId;
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
}
