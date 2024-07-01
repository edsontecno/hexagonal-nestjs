import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Produto } from 'src/application/produto/core/domain/Produto';
import { CreateProdutoDto } from '../output/dto/create-produto.dto';
import { ProdutoServicePort } from 'src/application/produto/ports/input/ProdutoServicePort';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly adapter: ProdutoServicePort) {}

  @Post()
  create(@Body() produtoDto: CreateProdutoDto) {
    const produto = new Produto();
    Object.assign(produto, produtoDto);

    return this.adapter.save(produto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adapter.get(id);
  }

  @Get('/categoria/:id')
  findAllByCategoria(@Param('id') id: number) {
    return this.adapter.findAllByCategoria(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() produtoDto: CreateProdutoDto) {
    const produto = new Produto();
    Object.assign(produto, produtoDto);
    return this.adapter.update(id, produto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adapter.delete(id);
  }
}
