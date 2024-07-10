import { ProductEntity } from 'src/adapters/product/output/Product.entity';
import { OrderEntity } from './Order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'itens_pedidos' })
export class OrderItemEntity {
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

  @ManyToOne(() => OrderEntity, (order) => order.itensOrder, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pedido: OrderEntity;

  @ManyToOne(() => ProductEntity, {
    cascade: ['update'],
  })
  product: ProductEntity;
}
