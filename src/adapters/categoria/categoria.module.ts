import { Module } from '@nestjs/common';
import { CategoriaController } from './input/categoria.controller';
import { CategoriaOutput } from './output';
import { CategoriaInput } from './input';
import { CategoriaEntity } from './output/Categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEntity])],
  controllers: [CategoriaController],
  providers: [...CategoriaOutput, ...CategoriaInput],
  exports: [...CategoriaOutput, ...CategoriaInput],
})
export class CategoriaModule {}
