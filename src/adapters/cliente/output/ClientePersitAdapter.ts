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
    clienteEntity.nome = cliente.nome;
    await this.usuarioRepository.save(clienteEntity);
    return 1;
  }
}
