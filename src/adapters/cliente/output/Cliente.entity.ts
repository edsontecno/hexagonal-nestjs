import { PedidoEntity } from 'src/adapters/pedido/output/Pedido.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class ClienteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'email', length: 200, nullable: false })
  email: string;

  @Column({ name: 'cpf', length: 11, nullable: false, unique: true })
  cpf: string;

  @OneToMany(() => PedidoEntity, (pedido) => pedido.cliente, {
    cascade: true,
  })
  pedidos: PedidoEntity[];
}
