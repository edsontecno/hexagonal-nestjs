import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaPersistPort } from 'src/application/categoria/ports/output/CategoriaPersistPort';
import { Repository } from 'typeorm';
import { CategoriaEntity } from './Categoria.entity';
import { Categoria } from 'src/application/categoria/core/domain/Categoria';

export class CategoriaPersistAdapter implements CategoriaPersistPort {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly repository: Repository<CategoriaEntity>,
  ) {}
  async save(categoria: Categoria): Promise<number> {
    const entity = new CategoriaEntity();
    Object.assign(entity, categoria);
    await this.repository.save(entity);
    return entity.id;
  }

  async get(id: number): Promise<Categoria> {
    const categoriaEntity = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['produtos'],
    });
    const categoria = new Categoria();
    Object.assign(categoria, categoriaEntity);
    return categoria;
  }
  async delete(id: number): Promise<void> {
    const entity = await this.get(id);
    this.repository.delete(entity.id);
  }
  async update(id: number, categoria: Categoria): Promise<Categoria> {
    const entity = new CategoriaEntity();
    const categoriaPesquisado = await this.get(id);
    Object.assign(entity, categoriaPesquisado);
    Object.assign(entity, categoria);
    await this.repository.save(entity);
    return categoriaPesquisado;
  }

  // async saveCliente(cliente: Cliente): Promise<number> {
  //   const clienteEntity = new ClienteEntity();
  //   Object.assign(clienteEntity, cliente);
  //   await this.usuarioRepository.save(clienteEntity);
  //   return clienteEntity.id;
  // }

  // getClienteByCpf(cpf: string): Promise<ClienteEntity> {
  //   //regras de negócio
  //   return this.usuarioRepository.findOneBy({ cpf });
  // }

  // async deleteCliente(cpf: string): Promise<void> {
  //   const cliente = await this.getClienteByCpf(cpf);
  //   this.usuarioRepository.delete(cliente.id);
  // }

  // async updateCliente(cpf: string, cliente: Cliente): Promise<Cliente> {
  //   const clienteEntity = await this.getClienteByCpf(cpf);
  //   Object.assign(clienteEntity, cliente);
  //   await this.usuarioRepository.save(clienteEntity);
  //   return cliente;
  // }
}
