import { Pedido } from 'src/application/pedido/core/domain/Pedido';

export class Cliente {
  readonly id: number;
  readonly nome: string;
  readonly email: string;
  readonly cpf: string;
  readonly pedidos: Pedido[];
}
