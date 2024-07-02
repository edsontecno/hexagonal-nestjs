import { ClienteEntity } from '../../cliente/output/Cliente.entity';
import { ItemPedidoEntity } from '../output/ItemPedido.entity';
import { StatusPedido } from '../../../application/pedido/core/domain/StatusPedido';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
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

  @ManyToOne(() => ClienteEntity, { nullable: true })
  cliente: ClienteEntity;

  @Column({
    type: 'enum',
    enum: StatusPedido,
    default: StatusPedido.Pendente,
  })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido, {
    cascade: true,
  })
  itensPedido: ItemPedidoEntity[];
}
