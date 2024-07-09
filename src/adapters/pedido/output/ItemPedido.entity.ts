import { PedidoEntity } from './Pedido.entity';
import { ProdutoEntity } from '../../produto/output/Produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'itens_pedidos' })
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({
    name: 'preco_venda',
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  precoVenda: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pedido: PedidoEntity;

  @ManyToOne(() => ProdutoEntity, {
    cascade: ['update'],
  })
  produto: ProdutoEntity;
}
