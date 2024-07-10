import { OrderProcess } from '../../core/domain/OrderProcess';
import { Order } from '../../core/domain/Order';
import { Product } from 'src/application/product/core/domain/Product';
import { Customer } from 'src/application/custumer/core/domain/Customer';
import { OrderStatus } from '../../core/domain/OrderStatus';

export abstract class OrderPersistPort {
  abstract save(order: OrderProcess): Promise<number>;
  abstract getProductById(id: number): Promise<Product>;
  abstract changeOrderStatus(id: number, status: OrderStatus);
  abstract getAllByStatus(status: OrderStatus);
  abstract changeStatus(id: number, status: OrderStatus): Promise<string>;
  abstract getOrdersByCustomer(cpf: string): Promise<Order[]>;
  abstract getCustomer(id: string): Promise<Customer>;
  abstract get(id: number): Promise<Order>;
}
