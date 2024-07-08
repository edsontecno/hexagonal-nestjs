import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoInput } from './input';
import { PedidoController } from './input/pedido.controller';
import { PedidoOutput } from './output';
import { PedidoEntity } from './output/Pedido.entity';
import { ItemPedidoEntity } from './output/ItemPedido.entity';
import { ProdutoServicePort } from 'src/application/produto/ports/input/ProdutoServicePort';
import { ProdutoService } from 'src/application/produto/core/service/ProdutoService';
import { ProdutoPersistPort } from 'src/application/produto/ports/output/ProdutoPersistPort';
import { ProdutoPersistAdapter } from '../produto/output/ProdutoPersitAdapter';
import { ProdutoEntity } from '../produto/output/Produto.entity';
import { ClienteServicePort } from 'src/application/cliente/ports/input/ClienteServicePort';
import { ClienteService } from 'src/application/cliente/core/service/ClienteService';
import { ClientePersistPort } from 'src/application/cliente/ports/output/ClientePersistPort';
import { ClientePersistAdapter } from '../cliente/output/ClientePersitAdapter';
import { ClienteEntity } from '../cliente/output/Cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PedidoEntity,
      ItemPedidoEntity,
      ProdutoEntity,
      ClienteEntity,
    ]),
  ],
  controllers: [PedidoController],
  providers: [
    ...PedidoOutput,
    ...PedidoInput,
    {
      provide: ProdutoServicePort,
      useClass: ProdutoService,
    },
    {
      provide: ProdutoPersistPort,
      useClass: ProdutoPersistAdapter,
    },
    {
      provide: ClienteServicePort,
      useClass: ClienteService,
    },
    {
      provide: ClientePersistPort,
      useClass: ClientePersistAdapter,
    },
  ],
  exports: [
    ...PedidoOutput,
    ...PedidoInput,
    {
      provide: ProdutoServicePort,
      useClass: ProdutoService,
    },
  ],
})
export class PedidoModule {}
