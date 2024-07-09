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
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: CreateProdutoDto,
  })
  findOne(@Param('id') id: number) {
    return this.adapter.get(id);
  }

  @Get('/categoria/:id')
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: [CreateProdutoDto],
  })
  findAllByCategoria(@Param('id') id: number) {
    return this.adapter.findAllByCategoria(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: CreateProdutoDto,
  })
  update(@Param('id') id: number, @Body() produtoDto: CreateProdutoDto) {
    const produto = new Produto();
    Object.assign(produto, produtoDto);
    return this.adapter.update(id, produto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Excluir produto por id',
  })
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.adapter.delete(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
