import { IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";


export class UpdateTiendaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(150)
    nombre: string;

    @IsString()
    @Length(3, 3)
    @Matches(/^[A-Z]{3}$/, {
        message: 'La ciudad debe ser un código de tres letras mayúsculas Ejemplo: (e.g., SMR, BOG, MED)',
    })
    ciudad: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(150)
    direccion: string;
}
