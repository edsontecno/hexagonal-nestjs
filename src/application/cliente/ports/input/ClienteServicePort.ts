import { Cliente } from '../../core/domain/Cliente';

export abstract class ClienteServicePort {
  abstract saveCliente(cliente: Cliente): Promise<void>;
  abstract getCliente(cpf: string): Promise<Cliente>;
  abstract deleteCliente(cpf: string): Promise<void>;
  abstract updateCliente(cpf: string, cliente: Cliente): Promise<Cliente>;
}
