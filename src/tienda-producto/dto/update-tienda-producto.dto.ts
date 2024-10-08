import { PartialType } from '@nestjs/mapped-types';
import { CreateTiendaProductoDto } from './create-tienda-producto.dto';

export class UpdateTiendaProductoDto extends PartialType(CreateTiendaProductoDto) {}
