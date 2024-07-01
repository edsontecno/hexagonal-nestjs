import { Module } from '@nestjs/common';
import { ClienteController } from './input/cliente.controller';
import { Services } from './input';
import { ServicesOutput } from './output';
import { ClienteEntity } from './output/Cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  controllers: [ClienteController],
  providers: [...Services, ...ServicesOutput],
  exports: [...Services, ...ServicesOutput],
})
export class ClienteModule {}
