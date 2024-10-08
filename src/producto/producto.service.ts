import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { distinct } from 'rxjs';
import { TiendaService } from 'src/tienda/tienda.service';
import { tienda } from 'src/tienda/entities/tienda.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly tiendaService: TiendaService
  ) { }

  async create(createProductoDto: CreateProductoDto) {
    const producto = await this.productoRepository.save(createProductoDto)
    return producto;
  }

  async findAll() {
    const productos = await this.productoRepository.find();

    if (!productos) {
      throw new NotFoundException(`No se encontraron productos`);
    }
    return productos;
  }


  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({ where: { id: id } });
    if (!producto) {
      throw new NotFoundException(`No se encontró el producto ${id}`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.findOne({ where: { id: id } });
    if (!producto) {
      throw new NotFoundException(`No se encontró el producto ${id}`);
    }

    const nuevoproducto = {
      ...producto,
      ...updateProductoDto
    }
    return await this.productoRepository.save(nuevoproducto);
  }

  async remove(id: number) {
    const producto = await this.productoRepository.findOne({ where: { id: id } });
    if (!producto) {
      throw new NotFoundException(`No se encontró el producto ${id}`);
    }
    await this.productoRepository.delete(producto)
    return "Producto Eliminado";
  }

  async addStoreToProduct(productoId: number, tiendaId: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: {
        id: productoId,
      },
      relations: ["tiendas"]
    });
    const tienda = await this.tiendaService.findOne(tiendaId);

    if (!producto) {
      throw new NotFoundException(`No se encontró el producto ${productoId}`);
    }

    if (!tienda) {
      throw new NotFoundException(`No se encontró la tienda ${tiendaId}`);
    }

    //producto.tiendas.push(tienda);
    const nuevoproducto = { ...producto, tiendas: [...producto.tiendas, tienda] }
    const updated_product = await this.productoRepository.save(nuevoproducto);
    return updated_product;
  }

  async findStoresFromProduct(productoId: number, tiendaId: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: {
        id: productoId, tiendas: { id: tiendaId }
      },
      relations: {
        tiendas: true,
      }
    });

    if (!producto) {
      throw new NotFoundException('No se encontró el producto');
    }
    return producto
  }

  async findStoreFromProduct(productoId: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: {
        id: productoId
      },
      relations: {
        tiendas: true,
      }
    });

    if (!producto) {
      throw new NotFoundException('No se encontró el producto');
    }
    return producto
  }

  async updateStoresFromProduct(productoId: number, tiendasId: number[]): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id: productoId });
    const tiendas = await this.tiendaService.findIn(tiendasId)

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

  async deleteStoreFromProduct(productoId: number): Promise<Producto> {
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
    producto.tiendas = [];
    const updated_producto = await this.productoRepository.save(producto);
    return updated_producto
  }


}
