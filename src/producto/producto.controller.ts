import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { tienda } from 'src/tienda/entities/tienda.entity';

@Controller('products')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    return await this.productoService.create(createProductoDto);
  }

  @Get()
  async findAll() {
    return await this.productoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return await this.productoService.update(id, updateProductoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.productoService.remove(id);
  }

  @Post(':productoId/stores/:tiendaId')
  async addStoreToProduct(
    @Param('productoId') productoId: number,
    @Param('tiendaId') tiendaId: number,
  ): Promise<Producto> {
    return this.productoService.addStoreToProduct(productoId, tiendaId);
  }
 
  @Get(':productoId/stores/:tiendaId')
  async findStoresFromProduct(
    @Param('productoId') productoId: number,
    @Param('tiendaId') tiendaId: number,
  ): Promise<Producto> {
    return this.productoService.findStoresFromProduct(productoId,tiendaId);
  }

  @Get('/stores/:productoId')
  async findStoreFromProduct(
    @Param('productoId') productoId: number,
  ): Promise<Producto> {
    return this.productoService.findStoreFromProduct(productoId);
  }

  @Put('/stores/:productoId')
  async updateStoresFromProduct(
    @Param('productoId') productoId: number,
    @Body() body: { tiendasId: number[] },
  ): Promise<Producto> {
    return this.productoService.updateStoresFromProduct(productoId, body.tiendasId);
  }

  @Delete('/stores/:productoId')
  async deleteStoreFromProduct(
    @Param('productoId') productoId: number,
  ): Promise<Producto> {
    return this.productoService.deleteStoreFromProduct(productoId);
  } 

}



