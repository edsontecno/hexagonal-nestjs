import { Module } from '@nestjs/common';
import { ClienteModule } from 'src/adapters/cliente/cliente.module';

@Module({
  imports: [ClienteModule],
  providers: [ClienteModule],
  exports: [ClienteModule],
})
export class ApplicationModule {}
