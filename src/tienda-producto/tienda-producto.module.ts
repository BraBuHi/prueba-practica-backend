import { Module } from '@nestjs/common';
import { TiendaProductoService } from './tienda-producto.service';
import { TiendaProductoController } from './tienda-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaProducto } from './entities/tienda-producto.entity';
import { tienda } from 'src/tienda/entities/tienda.entity';
import { Producto } from 'src/producto/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([tienda, Producto]),],
  controllers: [TiendaProductoController],
  providers: [TiendaProductoService],
})
export class TiendaProductoModule {}
