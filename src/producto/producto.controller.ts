import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('producto')
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
}
