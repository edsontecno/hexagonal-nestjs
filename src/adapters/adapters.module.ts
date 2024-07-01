import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [ClienteModule],
})
export class AdaptersModule {}
