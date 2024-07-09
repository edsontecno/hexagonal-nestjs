import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoInput } from './input';
import { ProdutoController } from './input/produto.controller';
import { ProdutoOutput } from './output';
import { ProdutoEntity } from './output/Produto.entity';
import { CategoriaServicePort } from '../../application/categoria/ports/input/CategoriaServicePort';
import { CategoriaService } from 'src/application/categoria/core/service/CategoriaService';
import { CategoriaPersistPort } from 'src/application/categoria/ports/output/CategoriaPersistPort';
import { CategoriaPersistAdapter } from '../categoria/output/CategoriaPersitAdapter';
import { CategoriaEntity } from '../categoria/output/Categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity, CategoriaEntity])],
  controllers: [ProdutoController],
  providers: [
    ...ProdutoOutput,
    ...ProdutoInput,
    {
      provide: CategoriaServicePort,
      useClass: CategoriaService,
    },
    {
      provide: CategoriaPersistPort,
      useClass: CategoriaPersistAdapter,
    },
  ],
  exports: [
    ...ProdutoOutput,
    ...ProdutoInput,
    {
      provide: CategoriaServicePort,
      useClass: CategoriaService,
    },
    {
      provide: CategoriaPersistPort,
      useClass: CategoriaPersistAdapter,
    },
  ],
})
export class ProdutoModule {}
