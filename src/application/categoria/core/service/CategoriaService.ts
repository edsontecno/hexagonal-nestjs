import { Injectable } from '@nestjs/common';
import { CategoriaServicePort } from '../../ports/input/CategoriaServicePort';
import { Categoria } from '../domain/Categoria';
import { CategoriaPersistPort } from '../../ports/output/CategoriaPersistPort';

@Injectable()
export class CategoriaService implements CategoriaServicePort {
  constructor(private persist: CategoriaPersistPort) {}

  save(categoria: Categoria): Promise<number> {
    return this.persist.save(categoria);
  }
  get(id: number): Promise<Categoria> {
    return this.persist.get(id);
  }
  delete(id: number): Promise<void> {
    return this.persist.delete(id);
  }
  update(id: number, categoria: Categoria): Promise<Categoria> {
    return this.persist.update(id, categoria);
  }
}
