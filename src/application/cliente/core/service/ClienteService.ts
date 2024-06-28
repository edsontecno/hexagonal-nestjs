import { Injectable } from '@nestjs/common';
import { Cliente } from '../domain/Cliente';
import { ClienteServicePort } from '../../ports/input/ClienteServicePort';
import { ClientePersistPort } from '../../ports/output/ClientePersistPort';

@Injectable()
export class ClienteService implements ClienteServicePort {
  constructor(private persist: ClientePersistPort) {}

  saveCliente(cliente: Cliente): Promise<number> {
    return this.persist.saveCliente(cliente);
  }

  getCliente(cpf: string): Promise<Cliente> {
    return this.persist.getClienteByCpf(cpf);
  }

  deleteCliente(cpf: string): Promise<void> {
    return this.persist.deleteCliente(cpf);
  }

  updateCliente(cpf: string, cliente: Cliente): Promise<Cliente> {
    return this.persist.updateCliente(cpf, cliente);
  }
}
