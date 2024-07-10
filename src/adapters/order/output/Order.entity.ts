import { OrderStatus } from 'src/application/order/core/domain/OrderStatus';
import { CustomerEntity } from '../../custumer/output/Customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './OrderItem.entity';

@Entity({ name: 'pedidos' })
export class OrderEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'total',
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total: number;

  @ManyToOne(() => CustomerEntity, { nullable: true })
  cliente: CustomerEntity;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pendente,
  })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @OneToMany(() => OrderItemEntity, (itemOrder) => itemOrder.pedido, {
    cascade: true,
  })
  itensOrder: OrderItemEntity[];
}
