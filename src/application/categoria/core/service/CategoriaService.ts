import { Injectable } from '@nestjs/common';
import { CategoriaServicePort } from '../../ports/input/CategoriaServicePort';
import { Categoria } from '../domain/Categoria';
import { CategoriaPersistPort } from '../../ports/output/CategoriaPersistPort';
import { Service } from 'src/application/service/service';
import { RegraNegocioException } from 'src/filtros/RegraNegocioException';

@Injectable()
export class CategoriaService extends Service implements CategoriaServicePort {
  constructor(private persist: CategoriaPersistPort) {
    super();
  }

  save(categoria: Categoria): Promise<number> {
    this.checkFields(categoria);
    return this.persist.save(categoria);
  }

  private checkFields(categoria: Categoria) {
    this.validField(categoria.nome, 'nome');
    this.validField(categoria.descricao, 'descrição');
  }

  async get(id: number): Promise<Categoria> {
    const categoria = await this.persist.get(id);
    this.checkField(
      categoria.id,
      'Não foi possível encontrar a categoria informada',
    );
    return categoria;
  }
  async getSigle(id: number): Promise<Categoria> {
    const categoria = await this.persist.getSigle(id);
    this.checkField(
      categoria.id,
      'Não foi possível encontrar a categoria informada',
    );
    return categoria;
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.get(id);

    if (categoria.produtos.length > 0) {
      throw new RegraNegocioException(
        'Não é possível deletar categoria com produtos vinculados',
      );
    }
    return await this.persist.delete(id);
  }
  update(id: number, categoria: Categoria): Promise<Categoria> {
    this.checkFields(categoria);
    return this.persist.update(id, categoria);
  }
}
