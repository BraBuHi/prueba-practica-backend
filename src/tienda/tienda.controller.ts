import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';

@Controller('stores')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  @Post()
  async create(@Body() createTiendaDto: CreateTiendaDto) {
    return await this.tiendaService.create(createTiendaDto);
  }

  @Get()
  async findAll() {
    return await this.tiendaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.tiendaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTiendaDto: UpdateTiendaDto) {
    return await this.tiendaService.update(id, updateTiendaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tiendaService.remove(id);
  }
}
