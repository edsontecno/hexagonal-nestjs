import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CategoriaServicePort } from 'src/application/categoria/ports/input/CategoriaServicePort';
import { CategoriaDto } from '../output/dto/categoria.dto';
import { Categoria } from 'src/application/categoria/core/domain/Categoria';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseBody } from 'src/filtros/filtro-de-excecao-global';
import { Response } from 'express';
import { CreateCategoriaDto } from '../output/dto/create-categoria.dto';

@ApiTags('Categoria')
@ApiBadRequestResponse({
  description: 'Detalhe do erro',
  type: ErrorResponseBody,
})
@ApiInternalServerErrorResponse({ description: 'Erro do servidor' })
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly adapter: CategoriaServicePort) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar categoria' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro de categoria',
  })
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    const categoria = new Categoria();
    Object.assign(categoria, createCategoriaDto);
    await this.adapter.save(categoria);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar categoria por id' })
  @ApiResponse({
    status: 200,
    description: 'Consultar categoria por id',
    type: CategoriaDto,
  })
  findOne(@Param('id') id: number) {
    return this.adapter.getSigle(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria por id' })
  @ApiResponse({
    status: 200,
    description: 'Atualizar categoria por id',
    type: CategoriaDto,
  })
  update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: CreateCategoriaDto,
  ) {
    const categoria = new Categoria();
    Object.assign(categoria, updateCategoriaDto);
    return this.adapter.update(id, categoria);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar categoria' })
  @ApiResponse({
    status: 204,
    description: 'Excluir categoria por id',
  })
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.adapter.delete(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
