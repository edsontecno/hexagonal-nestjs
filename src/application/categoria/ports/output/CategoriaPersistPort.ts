import { Categoria } from './../../core/domain/Categoria';

export abstract class CategoriaPersistPort {
  abstract save(categoria: Categoria): Promise<number>;
  abstract get(id: number): Promise<Categoria>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, categoria: Categoria): Promise<Categoria>;
}
