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
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    const categoria = new Categoria();
    Object.assign(categoria, createCategoriaDto);

    return this.adapter.save(categoria);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Consultar cliente por cpf',
    type: CategoriaDto,
  })
  findOne(@Param('id') id: number) {
    return this.adapter.getSigle(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: CreateCategoriaDto,
  ) {
    const categoria = new Categoria();
    Object.assign(categoria, updateCategoriaDto);
    return this.adapter.update(id, categoria);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Excluir categoria por id',
  })
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.adapter.delete(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
