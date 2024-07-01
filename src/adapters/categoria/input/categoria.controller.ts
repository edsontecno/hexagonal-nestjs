import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriaServicePort } from 'src/application/categoria/ports/input/CategoriaServicePort';
import { CreateCategoriaDto } from '../output/dto/create-categoria.dto';
import { Categoria } from 'src/application/categoria/core/domain/Categoria';

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
  findOne(@Param('id') id: number) {
    return this.adapter.get(id);
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
  remove(@Param('id') id: number) {
    return this.adapter.delete(id);
  }
}
