import { Injectable } from '@nestjs/common';
import { Cliente } from '../domain/Cliente';
import { ClienteServicePort } from '../../ports/input/ClienteServicePort';
import { ClientePersistPort } from '../../ports/output/ClientePersistPort';

@Injectable()
export class ClienteService implements ClienteServicePort {
  constructor(private persist: ClientePersistPort) {}

  saveCliente(cliente: Cliente): Promise<number> {
    //regras de negócio
    return this.persist.saveCliente(cliente);
  }
}
