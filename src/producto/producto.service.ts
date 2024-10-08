import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { distinct } from 'rxjs';

@Injectable()
export class ProductoService
 { 
  constructor(
  @InjectRepository(Producto)
  private readonly productoRepository: Repository<Producto>) { }
  
  async create(createProductoDto: CreateProductoDto) {
    const producto = await this.productoRepository.save(createProductoDto)
    return producto;
  }

  async findAll() {
    return await this.productoRepository.find();
  }

  async findOne(id: number) {
    return await this.productoRepository.findOne({where:{id:id}});
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto=await this.productoRepository.findOne({where:{id:id}});
    const nuevoproducto={
      ...producto,
      ...updateProductoDto
    }
    return await this.productoRepository.save(nuevoproducto);
  }

  async remove(id: number) {
    const producto=await this.productoRepository.findOne({where:{id:id}});
    await this.productoRepository.delete(producto)
    return "Producto Eliminado";
  }
}
