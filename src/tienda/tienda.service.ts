import { Injectable } from '@nestjs/common';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { tienda } from './entities/tienda.entity';
import { Repository } from 'typeorm';

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
    return await this.tiendaRepository.find();
  }

  async findOne(id: number) {
    return await this.tiendaRepository.findOne({where:{id:id}});
  }

  async update(id: number, updateTiendaDto: UpdateTiendaDto) {
    const tienda=await this.tiendaRepository.findOne({where:{id:id}});
    const nuevatienda={
      ...tienda,
      ...updateTiendaDto
    }
    return await this.tiendaRepository.save(nuevatienda);
  }

  async remove(id: number) {
    const tienda=await this.tiendaRepository.findOne({where:{id:id}});
    await this.tiendaRepository.delete(tienda)
    return "Tienda Eliminada";
  }
}
