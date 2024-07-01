import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoInput } from './input';
import { ProdutoController } from './input/produto.controller';
import { ProdutoOutput } from './output';
import { ProdutoEntity } from './output/Produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  controllers: [ProdutoController],
  providers: [...ProdutoOutput, ...ProdutoInput],
  exports: [...ProdutoOutput, ...ProdutoInput],
})
export class ProdutoModule {}
