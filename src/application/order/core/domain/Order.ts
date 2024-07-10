'use strict';

import { OrderItem } from './OrderItems';
import { OrderStatus } from './OrderStatus';

export class Order {
  readonly itens: [OrderItem];
  readonly customerId: string;
  readonly status: OrderStatus;
  readonly awaitTime: string;
}
