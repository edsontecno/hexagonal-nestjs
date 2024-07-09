import { Injectable } from '@nestjs/common';
import { Cliente } from '../domain/Cliente';
import { ClienteServicePort } from '../../ports/input/ClienteServicePort';
import { ClientePersistPort } from '../../ports/output/ClientePersistPort';
import { RegraNegocioException } from 'src/filtros/RegraNegocioException';
import { cpf } from 'cpf-cnpj-validator';
import { Service } from 'src/application/service/service';

@Injectable()
export class ClienteService extends Service implements ClienteServicePort {
  constructor(private persist: ClientePersistPort) {
    super();
  }

  async saveCliente(cliente: Cliente): Promise<void> {
    this.validarRegrasCliente(cliente);

    const clientePesquisado = await this.getCliente(cliente.cpf);

    if (clientePesquisado.id !== undefined) {
      throw new RegraNegocioException('CPF já cadastrado na base de dados');
    }

    await this.persist.saveCliente(cliente);
  }

  private validarRegrasCliente(cliente: Cliente) {
    this.validField(cliente.nome, 'nome');
    this.validField(cliente.email, 'email');

    this.validarCpfObrigatorio(cliente.cpf);

    if (!cpf.isValid(cliente.cpf)) {
      throw new RegraNegocioException('CPF informado não é válido');
    }
  }

  private validarCpfObrigatorio(cpf: string) {
    this.validField(cpf, 'cpf');
  }

  getCliente(cpf: string): Promise<Cliente> {
    this.validarCpfObrigatorio(cpf);
    return this.persist.getClienteByCpf(cpf);
  }

  async deleteCliente(cpf: string): Promise<void> {
    this.validarCpfObrigatorio(cpf);
    const cliente = await this.cpfExiste(cpf);

    if (cliente.pedidos.length > 0) {
      throw new RegraNegocioException(
        'Não é possível deletar clientes com pedidos vinculados',
      );
    }

    this.persist.deleteCliente(cpf);
  }

  private async cpfExiste(cpf: string) {
    const clientePesquisado = await this.getCliente(cpf);
    if (clientePesquisado.cpf === undefined) {
      throw new RegraNegocioException('CPF não localizado na base de dados');
    }

    return clientePesquisado;
  }

  async updateCliente(cpf: string, cliente: Cliente): Promise<Cliente> {
    this.validarRegrasCliente(cliente);
    await this.cpfExiste(cpf);
    return this.persist.updateCliente(cpf, cliente);
  }
}
