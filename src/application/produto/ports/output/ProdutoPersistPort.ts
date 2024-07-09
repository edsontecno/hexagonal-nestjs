import { Categoria } from 'src/application/categoria/core/domain/Categoria';
import { Produto } from '../../core/domain/Produto';

export abstract class ProdutoPersistPort {
  abstract save(produto: Produto): Promise<number>;
  abstract get(id: number): Promise<Produto>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, produto: Produto): Promise<Produto>;
  abstract findAllByCategoria(idCategoria: number): Promise<Produto[]>;
  abstract findCategoriaById(categoriaId: number): Promise<Categoria>;
}
