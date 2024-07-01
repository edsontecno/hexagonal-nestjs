import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [ClienteModule, CategoriaModule],
})
export class AdaptersModule {}
