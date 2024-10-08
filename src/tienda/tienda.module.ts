import { Module } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { TiendaController } from './tienda.controller';

@Module({
  controllers: [TiendaController],
  providers: [TiendaService],
})
export class TiendaModule {}
