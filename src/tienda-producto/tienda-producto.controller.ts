import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TiendaProductoService } from './tienda-producto.service';
import { CreateTiendaProductoDto } from './dto/create-tienda-producto.dto';
import { UpdateTiendaProductoDto } from './dto/update-tienda-producto.dto';
import { Producto } from 'src/producto/entities/producto.entity';
import { tienda } from 'src/tienda/entities/tienda.entity';

@Controller('productos/:productoId/tiendas')
export class TiendaProductoController {
  constructor(private readonly tiendaProductoService: TiendaProductoService) {}

  @Post('add')
  async addStoreToProduct(
    @Param('productoId') productoId: number,
    @Body() body: { tiendaId: number },
  ): Promise<Producto> {
    return this.tiendaProductoService.addStoreToProduct(productoId, body.tiendaId);
  }

  @Get()
  async findStoresFromProduct(
    @Param('productoId') productoId: number,
  ): Promise<tienda[]> {
    return this.tiendaProductoService.findStoresFromProduct(productoId);
  }

  @Get(':tiendaId')
  async findStoreFromProduct(
    @Param('productoId') productoId: number,
    @Param('tiendaId') tiendaId: number,
  ): Promise<tienda> {
    return this.tiendaProductoService.findStoreFromProduct(productoId, tiendaId);
  }

  @Put()
  async updateStoresFromProduct(
    @Param('productoId') productoId: number,
    @Body() body: { tiendasId: number[] },
  ): Promise<Producto> {
    return this.tiendaProductoService.updateStoresFromProduct(productoId, body.tiendasId);
  }

  @Delete(':tiendaId')
  async deleteStoreFromProduct(
    @Param('productoId') productoId: number,
    @Param('tiendaId') tiendaId: number,
  ): Promise<Producto> {
    return this.tiendaProductoService.deleteStoreFromProduct(productoId, tiendaId);
  }
}
