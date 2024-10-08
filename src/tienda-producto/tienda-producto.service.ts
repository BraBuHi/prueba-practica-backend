import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiendaProductoDto } from './dto/create-tienda-producto.dto';
import { UpdateTiendaProductoDto } from './dto/update-tienda-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/producto/entities/producto.entity';
import { tienda } from 'src/tienda/entities/tienda.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TiendaProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(tienda)
    private readonly tiendaRepository: Repository<tienda>,
  ) { }
  
  async addStoreToProduct(productoId: number, tiendaId: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id: productoId },
      relations: ['tiendas'],
    });
    const tienda = await this.tiendaRepository.findOneBy({ id: tiendaId });
    if (!producto || !tienda) throw new Error('Producto o tienda no encontrados');

    producto.tiendas.push(tienda);
    return this.productoRepository.save(producto);
  }

  async findStoresFromProduct(productoId: number): Promise<tienda[]> {
    const producto = await this.productoRepository.findOne({
      where: {
        id: productoId,
      },
      relations: {
        tiendas: true,
      }
    });

    if (!producto) {
      throw new NotFoundException('No se encontró el producto');
    }
    return producto.tiendas
  }

  async findStoreFromProduct(productoId: number, tiendaId: number): Promise<tienda> {
    const producto = await this.productoRepository.findOneBy({ id: productoId });

    if (!producto) {
      throw new NotFoundException(`No se encontró el producto ${productoId}}`);
    }
    const find = producto?.tiendas?.find((tienda) => tienda.id === tiendaId) ?? false;
    if (!find) {
      throw new NotFoundException(`El Producto ${productoId} no tiene asociada la Tienda ${tiendaId}`);
    }

    return producto.tiendas.find((tienda) => tienda.id === tiendaId);
  }

  async updateStoresFromProduct(productoId: number, tiendasId: number[]): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id: productoId });
    const tiendas = await this.tiendaRepository.find({
      where: { id: In(tiendasId) }
    })
    if (tiendas.length !== tiendasId.length) {
      throw new NotFoundException('Una o mas tiendas no existen');
    }
    if (!producto) {
      throw new NotFoundException(`No se encontró el producto ${productoId}`);
    }

    producto.tiendas = tiendas;
    const updated_product = await this.productoRepository.save(producto);
    return updated_product;
  }

  async deleteStoreFromProduct(productoId: number, tiendaId: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: {
        id: productoId,
      },
      relations: {
        tiendas: true,
      }
    })

    if (!producto) {
      throw new NotFoundException(`No se encontró el producto ${productoId}`);
    }
    const tiendaIndex = producto.tiendas.findIndex((tienda) => tienda.id == tiendaId);

    if (tiendaIndex === -1) {
      throw new NotFoundException(`La tienda ${tiendaId} no está asociada al producto ${productoId} o no existe`);
    }
    const tienda = await this.tiendaRepository.findOneBy({ id: tiendaId });
    await this.tiendaRepository.remove(tienda);
    producto.tiendas.splice(tiendaIndex, 1);
    const updated_producto = await this.productoRepository.save(producto);
    return updated_producto
  }
}
