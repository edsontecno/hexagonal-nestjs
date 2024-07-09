import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoPersistPort } from 'src/application/produto/ports/output/ProdutoPersistPort';
import { Repository } from 'typeorm';
import { ProdutoEntity } from './Produto.entity';
import { Produto } from 'src/application/produto/core/domain/Produto';
import { Categoria } from 'src/application/categoria/core/domain/Categoria';
import { CategoriaServicePort } from 'src/application/categoria/ports/input/CategoriaServicePort';

export class ProdutoPersistAdapter implements ProdutoPersistPort {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly repository: Repository<ProdutoEntity>,
    private readonly categoriaService: CategoriaServicePort,
  ) {}

  async save(produto: Produto): Promise<number> {
    const entity = new ProdutoEntity();
    Object.assign(entity, produto);
    await this.repository.save(entity);
    return entity.id;
  }
  async get(id: number): Promise<Produto> {
    const entity = await this.repository.findOneBy({ id });
    const produto = new Produto();
    Object.assign(produto, entity);
    return produto;
  }
  getEntity(id: number): Promise<ProdutoEntity> {
    return this.repository.findOneBy({ id });
  }
  async delete(id: number): Promise<void> {
    const entity = await this.getEntity(id);
    this.repository.delete(entity.id);
  }
  async update(id: number, produto: Produto): Promise<Produto> {
    const entity = await this.getEntity(id);
    Object.assign(entity, produto);
    await this.repository.save(entity);
    return produto;
  }
  async findAllByCategoria(idCategoria: number): Promise<Produto[]> {
    const result = [];
    const list = await this.repository.find({
      where: { categoria: { id: idCategoria } },
    });
    list.forEach((element) => {
      const newProduto = new Produto();
      Object.assign(newProduto, element);
      result.push(newProduto);
    });
    return result;
  }

  findCategoriaById(categoriaId: number): Promise<Categoria> {
    return this.categoriaService.get(categoriaId);
  }
}
