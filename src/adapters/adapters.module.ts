import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [ClienteModule, CategoriaModule, ProdutoModule, PedidoModule],
})
export class AdaptersModule {}
