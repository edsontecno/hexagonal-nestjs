import { CategoryEntity } from '../../category/output/Category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produtos' })
export class ProductEntity {
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
    precision: 10,
    scale: 2,
  })
  preco: number;

  @Column({ name: 'imagem', type: 'text', nullable: true })
  imagem: string;

  @ManyToOne(() => CategoryEntity, (categoria) => categoria.products)
  categoria: CategoryEntity;
}
