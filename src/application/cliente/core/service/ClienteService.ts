import { Injectable } from '@nestjs/common';
import { Cliente } from '../domain/Cliente';
import { ClienteServicePort } from '../../ports/input/ClienteServicePort';
import { ClientePersistPort } from '../../ports/output/ClientePersistPort';
import { RegraNegocioException } from 'src/filtros/RegraNegocioException';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class ClienteService implements ClienteServicePort {
  constructor(private persist: ClientePersistPort) {}

  async saveCliente(cliente: Cliente): Promise<number> {
    this.validarRegrasCliente(cliente);

    const clientePesquisado = await this.getCliente(cliente.cpf);

    if (clientePesquisado) {
      throw new RegraNegocioException('CPF já cadastrado na base de dados');
    }

    await this.persist.saveCliente(cliente);
    return;
  }

  private validarRegrasCliente(cliente: Cliente) {
    if (!cliente.nome) {
      throw new RegraNegocioException(
        'Campo nome é de preenchimento obrigatório',
      );
    }

    if (!cliente.email) {
      throw new RegraNegocioException(
        'Campo email é de preenchimento obrigatório',
      );
    }

    this.validarCpfObrigatorio(cliente.cpf);

    if (!cpf.isValid(cliente.cpf)) {
      throw new RegraNegocioException('CPF informado não é válido');
    }
  }

  private validarCpfObrigatorio(cpf: string) {
    if (!cpf || cpf === '') {
      throw new RegraNegocioException(
        'Campo cpf é de preenchimento obrigatório',
      );
    }
  }

  getCliente(cpf: string): Promise<Cliente> {
    this.validarCpfObrigatorio(cpf);
    return this.persist.getClienteByCpf(cpf);
  }

  async deleteCliente(cpf: string): Promise<void> {
    this.validarCpfObrigatorio(cpf);
    const cliente = await this.cpfExiste(cpf);
    console.log(cliente);
    if (cliente.pedidos) {
      throw new RegraNegocioException(
        'Não é possível deletar clientes com pedidos vinculados',
      );
    }
    return;
  }

  private async cpfExiste(cpf: string) {
    const clientePesquisado = await this.getCliente(cpf);
    console.log(clientePesquisado.cpf);
    if (!clientePesquisado || clientePesquisado.cpf === undefined) {
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
