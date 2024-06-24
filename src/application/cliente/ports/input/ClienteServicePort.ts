import { Cliente } from '../../core/domain/Cliente';

export abstract class ClienteServicePort {
  abstract saveCliente(cliente: Cliente): Promise<number>;
}
