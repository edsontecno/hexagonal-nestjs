import { Injectable } from '@nestjs/common';
import { ProdutoServicePort } from '../../ports/input/ProdutoServicePort';
import { Produto } from '../domain/Produto';
import { ProdutoPersistPort } from '../../ports/output/ProdutoPersistPort';
import { Categoria } from 'src/application/categoria/core/domain/Categoria';
import { RegraNegocioException } from 'src/filtros/RegraNegocioException';
import { Service } from 'src/application/service/service';

@Injectable()
export class ProdutoService extends Service implements ProdutoServicePort {
  constructor(private persist: ProdutoPersistPort) {
    super();
  }

  findAllByCategoria(idCategoria: number): Promise<Produto[]> {
    return this.persist.findAllByCategoria(idCategoria);
  }

  async save(produto: Produto): Promise<number> {
    await this.checkFields(produto);
    return this.persist.save(produto);
  }

  async checkFields(produto: Produto): Promise<void> {
    this.validField(produto.nome, 'nome');
    this.validField(produto.descricao, 'descrição');
    this.validField(produto.preco, 'preço');
    this.validField(produto.categoria, 'categoria');

    const categoria = await this.findCategoriaById(produto.categoria);
    if (categoria.id === undefined) {
      throw new RegraNegocioException('A categoria informada é inválida');
    }
  }

  findCategoriaById(categoriaId: number): Promise<Categoria> {
    return this.persist.findCategoriaById(categoriaId);
  }

  async get(id: number): Promise<Produto> {
    const produto = await this.persist.get(id);
    if (produto.id === undefined) {
      throw new RegraNegocioException('Produto não localizado');
    }
    return this.persist.get(id);
  }

  async delete(id: number): Promise<void> {
    try {
      await this.persist.delete(id);
    } catch (error) {
      if (error.message === 'PRODUTO_VINCULADO') {
        throw new RegraNegocioException(
          'Não é possível deletar produtos vinculados à pedidos',
        );
      }
    }
    return;
  }

  async update(id: number, produto: Produto): Promise<Produto> {
    await this.checkFields(produto);
    return this.persist.update(id, produto);
  }
}
