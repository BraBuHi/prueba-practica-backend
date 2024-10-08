import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { TiendaModule } from 'src/tienda/tienda.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]),TiendaModule],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
