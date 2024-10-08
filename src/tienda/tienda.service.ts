import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { tienda } from './entities/tienda.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TiendaService 
{
  constructor(
    @InjectRepository(tienda)
    private readonly tiendaRepository: Repository<tienda>){}


  async create(createTiendaDto: CreateTiendaDto) {
    const tienda= await this.tiendaRepository.save(createTiendaDto)
    return tienda;
  }

  async findAll() {
    const tiendas = await this.tiendaRepository.find();
    if (!tiendas) {
      throw new NotFoundException(`No se encontraron Tiendas`);
    }
    return tiendas;
  }

  async findOne(id: number) {
    const producto= await this.tiendaRepository.findOne({where:{id:id}});
    if (!producto) {
      throw new NotFoundException(`No se encontró la Tienda ${id}`);
    }
    return producto;
  }

  async update(id: number, updateTiendaDto: UpdateTiendaDto) {
    const tienda=await this.tiendaRepository.findOne({where:{id:id}});
    if (!tienda) {
      throw new NotFoundException(`No se encontró la Tienda ${id}`);}

    const nuevatienda={
      ...tienda,
      ...updateTiendaDto
    }
    return await this.tiendaRepository.save(nuevatienda);
  }

  async remove(id: number) {
    const tienda=await this.tiendaRepository.findOne({where:{id:id}});
    if (!tienda) {
      throw new NotFoundException(`No se encontró la Tienda ${id}`);
    }
    await this.tiendaRepository.delete(tienda)
    return "Tienda Eliminada";
  }

  async findIn(tiendasId:number[]){
    return await this.tiendaRepository.find({
      where: { id: In(tiendasId) }
    })
  }
}
