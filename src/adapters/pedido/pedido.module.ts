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

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, ItemPedidoEntity, ProdutoEntity]),
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
