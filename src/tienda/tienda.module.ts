import { Module } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { TiendaController } from './tienda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tienda } from './entities/tienda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tienda])],
  controllers: [TiendaController],
  providers: [TiendaService],
  exports: [TiendaService]
})
export class TiendaModule {}
