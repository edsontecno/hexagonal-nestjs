import { ProdutoEntity } from '../../produto/output/Produto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias' })
export class CategoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 500, nullable: false })
  descricao: string;

  @OneToMany(() => ProdutoEntity, (produto) => produto.categoria)
  produtos: ProdutoEntity[];
}
