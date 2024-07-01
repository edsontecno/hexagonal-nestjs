import { CategoriaEntity } from './../../categoria/output/Categoria.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 500, nullable: false })
  descricao: string;

  @Column({
    name: 'preco',
    nullable: false,
    type: 'decimal',
    precision: 2,
    scale: 2,
  })
  preco: number;

  @Column({
    name: 'preco',
    nullable: false,
    type: 'decimal',
    precision: 2,
    scale: 2,
  })
  @Column({ name: 'imagem', type: 'text', nullable: false })
  imagem: string;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.produtos)
  categoria: CategoriaEntity;
}
