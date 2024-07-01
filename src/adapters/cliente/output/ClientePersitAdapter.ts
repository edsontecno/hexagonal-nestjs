import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/application/cliente/core/domain/Cliente';
import { ClientePersistPort } from 'src/application/cliente/ports/output/ClientePersistPort';
import { Repository } from 'typeorm';
import { ClienteEntity } from './Cliente.entity';

export class ClientePersistAdapter implements ClientePersistPort {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly usuarioRepository: Repository<ClienteEntity>,
  ) {}

  async saveCliente(cliente: Cliente): Promise<number> {
    const clienteEntity = new ClienteEntity();
    Object.assign(clienteEntity, cliente);
    await this.usuarioRepository.save(clienteEntity);
    return clienteEntity.id;
  }

  getClienteByCpf(cpf: string): Promise<ClienteEntity> {
    //regras de negócio
    return this.usuarioRepository.findOneBy({ cpf });
  }

  async deleteCliente(cpf: string): Promise<void> {
    const cliente = await this.getClienteByCpf(cpf);
    this.usuarioRepository.delete(cliente.id);
  }

  async updateCliente(cpf: string, cliente: Cliente): Promise<Cliente> {
    const clienteEntity = await this.getClienteByCpf(cpf);
    Object.assign(clienteEntity, cliente);
    await this.usuarioRepository.save(clienteEntity);
    return cliente;
  }
}
