import { Injectable } from '@nestjs/common';
import { ProdutoServicePort } from '../../ports/input/ProdutoServicePort';
import { Produto } from '../domain/Produto';
import { ProdutoPersistPort } from '../../ports/output/ProdutoPersistPort';

@Injectable()
export class ProdutoService implements ProdutoServicePort {
  constructor(private persist: ProdutoPersistPort) {}

  findAllByCategoria(idCategoria: number): Promise<Produto[]> {
    return this.persist.findAllByCategoria(idCategoria);
  }

  save(produto: Produto): Promise<number> {
    return this.persist.save(produto);
  }
  get(id: number): Promise<Produto> {
    return this.persist.get(id);
  }
  delete(id: number): Promise<void> {
    return this.persist.delete(id);
  }
  update(id: number, produto: Produto): Promise<Produto> {
    return this.persist.update(id, produto);
  }
}
