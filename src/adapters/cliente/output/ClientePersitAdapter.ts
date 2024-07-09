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

  async saveCliente(cliente: Cliente): Promise<void> {
    const clienteEntity = new ClienteEntity();
    Object.assign(clienteEntity, cliente);
    await this.usuarioRepository.save(clienteEntity);
  }

  async getClienteByCpf(cpf: string): Promise<Cliente> {
    const cliente = await this.usuarioRepository.findOne({
      where: {
        cpf,
      },
      relations: ['pedidos'],
    });
    const result = new Cliente();
    Object.assign(result, cliente);
    return result;
  }

  async deleteCliente(cpf: string): Promise<void> {
    const cliente = await this.getClienteByCpf(cpf);
    this.usuarioRepository.delete(cliente.id);
  }

  async updateCliente(cpf: string, cliente: Cliente): Promise<Cliente> {
    const clienteEntity = await this.getClienteByCpf(cpf);
    const entity = new ClienteEntity();
    Object.assign(entity, cliente);
    entity.id = clienteEntity.id;

    await this.usuarioRepository.save(entity);
    return cliente;
  }
}
