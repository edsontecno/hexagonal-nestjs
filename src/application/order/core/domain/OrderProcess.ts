import { OrderItem } from './OrderItems';
import { OrderStatus } from './OrderStatus';

export class OrderProcess {
  itens?: OrderItem[];
  customerId: number;
  total: number;
  status: OrderStatus;
}
