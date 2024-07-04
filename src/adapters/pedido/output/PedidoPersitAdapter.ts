import { InjectRepository } from '@nestjs/typeorm';
import { PedidoProcessado } from 'src/application/pedido/core/domain/PedidoProcessado';
import { PedidoPersistPort } from 'src/application/pedido/ports/output/PedidoPersistPort';
import { Repository } from 'typeorm';
import { PedidoEntity } from './Pedido.entity';
import { ClienteEntity } from 'src/adapters/cliente/output/Cliente.entity';
import { ItemPedidoEntity } from './ItemPedido.entity';
import { ProdutoEntity } from 'src/adapters/produto/output/Produto.entity';
import { Produto } from 'src/application/produto/core/domain/Produto';
import { ProdutoServicePort } from 'src/application/produto/ports/input/ProdutoServicePort';
import { StatusPedido } from 'src/application/pedido/core/domain/StatusPedido';
import { Pedido } from 'src/application/pedido/core/domain/Pedido';

export class PedidoPersistAdapter implements PedidoPersistPort {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly repository: Repository<PedidoEntity>,
    private readonly produtoService: ProdutoServicePort,
  ) {}

  async save(pedido: PedidoProcessado): Promise<number> {
    const entity = new PedidoEntity();
    entity.cliente = new ClienteEntity();
    entity.cliente.id = pedido.clienteId;
    entity.itensPedido = [];
    pedido.itens.forEach((element) => {
      const itemPedido = new ItemPedidoEntity();
      itemPedido.produto = new ProdutoEntity();
      itemPedido.produto.id = element.produtoId;
      itemPedido.quantidade = element.quantidade;
      itemPedido.precoVenda = element.precoVenda;
      entity.itensPedido.push(itemPedido);
    });
    Object.assign(entity, pedido);

    await this.repository.save(entity);
    return entity.id;
  }

  getProdutoById(id: number): Promise<Produto> {
    return this.produtoService.get(id);
  }

  async changeStatusPedido(id: number, status: StatusPedido) {
    const pedido = await this.repository.findOneBy({ id });
    pedido.status = status;
    await this.repository.save(pedido);
  }

  getAllByStatus(status: StatusPedido) {
    return this.repository.find({ where: { status } });
  }
  async changeStatus(id: number, status: StatusPedido) {
    const pedido = await this.repository.findOneBy({ id });
    pedido.status = status;
    await this.repository.save(pedido);
    return '';
  }

  getPedidosByCliente(cpf: string): Promise<Pedido[]> {
    throw new Error('Method not implemented.');
  }
}
