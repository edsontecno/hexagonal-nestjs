import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias' })
export class CategoriaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 500, nullable: false })
  descricao: string;
}
