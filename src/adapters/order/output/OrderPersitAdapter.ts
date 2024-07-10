import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { OrderItemEntity } from './OrderItem.entity';
import { Product } from 'src/application/product/core/domain/Product';
import { ProductServicePort } from 'src/application/product/ports/input/ProductServicePort';
import { OrderStatus } from 'src/application/order/core/domain/OrderStatus';
import { Order } from 'src/application/order/core/domain/Order';
import { CustomerServicePort } from 'src/application/custumer/ports/input/CustomerServicePort';
import { CustomerEntity } from 'src/adapters/custumer/output/Customer.entity';
import { Customer } from 'src/application/custumer/core/domain/Customer';
import { OrderProcess } from 'src/application/order/core/domain/OrderProcess';
import { OrderPersistPort } from 'src/application/order/ports/output/OrderPersistPort';
import { ProductEntity } from 'src/adapters/product/output/Product.entity';

export class OrderPersistAdapter implements OrderPersistPort {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
    private readonly productService: ProductServicePort,
    private readonly customerService: CustomerServicePort,
  ) {}

  async save(order: OrderProcess): Promise<number> {
    const entity = new OrderEntity();
    entity.cliente = new CustomerEntity();
    entity.cliente.id = order.customerId;
    entity.itensOrder = [];
    order.itens.forEach((element) => {
      const itemOrder = new OrderItemEntity();
      itemOrder.product = new ProductEntity();
      itemOrder.product.id = element.productId;
      itemOrder.quantidade = element.quantidade;
      itemOrder.precoVenda = element.precoVenda;
      entity.itensOrder.push(itemOrder);
    });
    Object.assign(entity, order);

    await this.repository.save(entity);
    return entity.id;
  }

  getProductById(id: number): Promise<Product> {
    return this.productService.get(id);
  }

  async changeOrderStatus(id: number, status: OrderStatus) {
    const order = await this.repository.findOneBy({ id });
    order.status = status;
    await this.repository.save(order);
  }

  async getAllByStatus(status: OrderStatus): Promise<Order[]> {
    const ordersEntity = await this.repository.find({
      where: { status },
      relations: ['itensOrder', 'customer', 'itensOrder.product'],
    });
    const orders = [];
    for (const entity of ordersEntity) {
      const newOrder = new Order();
      Object.assign(newOrder, entity);
      orders.push(newOrder);
    }
    return orders;
  }
  async changeStatus(id: number, status: OrderStatus) {
    const order = await this.repository.findOneBy({ id });
    order.status = status;
    await this.repository.save(order);
    return '';
  }

  async getOrdersByCustomer(cpf: string): Promise<Order[]> {
    const ordersEntity = await this.repository.find({
      where: {
        cliente: {
          cpf,
        },
      },
      relations: ['itensOrder', 'customer', 'itensOrder.product'],
    });
    const orders: Order[] = [];
    for (const item of ordersEntity) {
      const newOrder = new Order();
      Object.assign(newOrder, item);
      orders.push(newOrder);
    }
    return orders;
  }

  getCustomer(cpf): Promise<Customer> {
    return this.customerService.getCustomer(cpf);
  }

  async get(id: number): Promise<Order> {
    const entity = await this.repository.findOneBy({ id });
    const order = new Order();
    Object.assign(order, entity);
    return order;
  }
}
