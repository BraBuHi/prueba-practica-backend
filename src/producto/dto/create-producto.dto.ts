import { IsString, IsNotEmpty, MinLength, IsNumber, MaxLength, IsEnum, IsArray } from 'class-validator';
//import { Type } from 'class-transformer';

export enum TypesEnum {
    PERECEDERO="Perecedero",
    NO_PERECEDERO="No Perecedero",
}

export class CreateProductoDto  {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(150)
    nombre: string;

    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @IsNotEmpty()
    @IsEnum(TypesEnum)
    tipo: TypesEnum;


  //  @IsArray()
  //  @Type(() => Store)
  //  stores?: Store[] | null

}