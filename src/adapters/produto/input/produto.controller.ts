import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Produto } from 'src/application/produto/core/domain/Produto';
import { CreateProdutoDto } from '../output/dto/create-produto.dto';
import { ProdutoServicePort } from 'src/application/produto/ports/input/ProdutoServicePort';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseBody } from 'src/filtros/filtro-de-excecao-global';
import { Response } from 'express';

@Controller('produto')
@ApiTags('Produto')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
export class ProdutoController {
  constructor(private readonly adapter: ProdutoServicePort) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto salvo',
  })
  async create(@Body() produtoDto: CreateProdutoDto) {
    const produto = new Produto();
    Object.assign(produto, produtoDto);
    await this.adapter.save(produto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar produto por id' })
  @ApiResponse({
    status: 200,
    description: 'Consultar produto por id',
    type: CreateProdutoDto,
  })
  findOne(@Param('id') id: number) {
    return this.adapter.get(id);
  }

  @Get('/categoria/:id')
  @ApiOperation({ summary: 'Consultar produto por categoria' })
  @ApiResponse({
    status: 200,
    description: 'Consultar produto por categoria',
    type: [CreateProdutoDto],
  })
  findAllByCategoria(@Param('id') id: number) {
    return this.adapter.findAllByCategoria(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar produto por id' })
  @ApiResponse({
    status: 200,
    description: 'Atualizar produto por categoria',
    type: CreateProdutoDto,
  })
  update(@Param('id') id: number, @Body() produtoDto: CreateProdutoDto) {
    const produto = new Produto();
    Object.assign(produto, produtoDto);
    return this.adapter.update(id, produto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir produto por id' })
  @ApiResponse({
    status: 204,
    description: 'Excluir produto por id',
  })
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.adapter.delete(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
