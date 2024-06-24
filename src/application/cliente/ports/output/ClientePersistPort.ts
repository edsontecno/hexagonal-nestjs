import { Cliente } from '../../core/domain/Cliente';

export abstract class ClientePersistPort {
  abstract saveCliente(cliente: Cliente): Promise<number>;
}
