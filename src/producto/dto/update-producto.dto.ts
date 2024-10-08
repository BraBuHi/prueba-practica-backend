import { TypesEnum } from './create-producto.dto';
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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
