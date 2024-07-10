import { Injectable } from '@nestjs/common';
import { Order } from '../domain/Order';
import { BusinessRuleException } from 'src/filtros/business-rule-exception';
import { timeInMinutes } from 'src/application/utils/utils';
import { OrderProcess } from '../domain/OrderProcess';
import { OrderStatus } from '../domain/OrderStatus';
import { OrderPersistPort } from '../../ports/output/OrderPersistPort';
import { OrderServicePort } from '../../ports/input/OrderServicePort';
import { OrderItem } from '../domain/OrderItems';

@Injectable()
export class OrderService implements OrderServicePort {
  constructor(private persist: OrderPersistPort) {}

  async save(order: Order): Promise<number> {
    const orderProcess = new OrderProcess();
    orderProcess.status = OrderStatus.Pendente;
    orderProcess.total = 0;
    orderProcess.itens = [];

    if (order.customerId) {
      const customer = await this.persist.getCustomer(order.customerId);

      if (customer.id === undefined) {
        throw new BusinessRuleException(
          'Cliente informado não existe na base de dados',
        );
      }
      orderProcess.customerId = customer.id;
    }

    if (order.itens.length < 1) {
      throw new BusinessRuleException(
        'Nenhum produto foi adicionado ao pedido',
      );
    }

    await this.prepareItems(order, orderProcess);

    const orderId = await this.persist.save(orderProcess);
    this.processPayment(orderId);

    return orderId;
  }

  private async prepareItems(order: Order, orderProcessado: OrderProcess) {
    for (const element of order.itens) {
      if (!element.productId) {
        throw new BusinessRuleException('Por favor informe o produto desejado');
      }

      const product = await this.persist.getProductById(element.productId);
      if (product.id === undefined) {
        throw new BusinessRuleException(
          `O produto com id '${element.productId}' não existe na base de dados`,
        );
      }
      if (!element.quantidade || element.quantidade < 1) {
        throw new BusinessRuleException(
          'A quantidade mínima de um produto é 1',
        );
      }
      const newItem = new OrderItem();
      newItem.productId = element.productId;
      newItem.quantidade = element.quantidade;
      newItem.precoVenda = parseFloat(product.preco) * element.quantidade;
      orderProcessado.itens.push(newItem);
      orderProcessado.total += newItem.precoVenda;
    }
  }

  async getAllByStatus(status): Promise<Order[]> {
    this.isStatusValid(status);
    const orders = await this.persist.getAllByStatus(status);
    this.addAwaitTimeOnOrders(orders);
    return orders;
  }

  private addAwaitTimeOnOrders(orders: any) {
    orders.map(
      (order) => (order.awaitTime = timeInMinutes(order.createdAt, new Date())),
    );
  }

  private isStatusValid(status: any) {
    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new BusinessRuleException('O status informado é inválido');
    }
  }

  async processPayment(orderId: number) {
    console.log('Processando pagamento....');
    await this.awaitPayment();
    console.log('Pagamento processado');
    this.persist.changeOrderStatus(orderId, OrderStatus.Recebido);
  }

  awaitPayment() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 30000);
    });
  }

  private statusPermitidos = {
    [OrderStatus.Pendente]: [OrderStatus.Recebido, OrderStatus.Cancelado],
    [OrderStatus.Recebido]: [OrderStatus.EmAndamento, OrderStatus.Cancelado],
    [OrderStatus.EmAndamento]: [OrderStatus.Pronto, OrderStatus.Cancelado],
    [OrderStatus.Pronto]: [OrderStatus.Finalizado],
    [OrderStatus.Finalizado]: [],
    [OrderStatus.Cancelado]: [],
  };

  checkTransactionStatus(
    statusAtual: OrderStatus,
    novoStatus: OrderStatus,
  ): boolean {
    const statusPossiveis = this.statusPermitidos[statusAtual];
    return statusPossiveis.includes(novoStatus);
  }

  async changeStatus(id: number, status: OrderStatus) {
    const order = await this.persist.get(id);
    if (!this.checkTransactionStatus(order.status, status)) {
      throw new BusinessRuleException('Transição de status inválida');
    }
    await this.persist.changeStatus(id, status);
    return 'Order alterado com sucesso';
  }

  async getOrderByCustomer(cpf: any): Promise<Order[]> {
    const orders = await this.persist.getOrdersByCustomer(cpf);
    this.addAwaitTimeOnOrders(orders);
    return orders;
  }

  getListStatus(): string[] {
    return Object.values(OrderStatus);
  }
}
