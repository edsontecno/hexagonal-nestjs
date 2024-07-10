import { ProductEntity } from 'src/adapters/product/output/Product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 500, nullable: false })
  descricao: string;

  @OneToMany(() => ProductEntity, (product) => product.categoria)
  products: ProductEntity[];
}
