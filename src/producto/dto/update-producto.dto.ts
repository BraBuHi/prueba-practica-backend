import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto, TypesEnum } from './create-producto.dto';
import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProductoDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(150)
    nombre: string;

    @IsOptional()
    @IsNumber()
    precio: number;

    @IsOptional()
    @IsEnum(TypesEnum)
    tipo: TypesEnum;
}
