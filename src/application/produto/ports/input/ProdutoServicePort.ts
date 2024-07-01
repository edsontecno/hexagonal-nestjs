import { Produto } from '../../core/domain/Produto';

export abstract class ProdutoServicePort {
  abstract save(produto: Produto): Promise<number>;
  abstract get(id: number): Promise<Produto>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, produto: Produto): Promise<Produto>;
  abstract findAllByCategoria(idCategoria: number): Promise<Produto[]>;
}
