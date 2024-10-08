import { Producto } from 'src/producto/entities/producto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity('tienda')
export class tienda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre', length: 150, nullable: false })
    nombre: string;

    @Column({ name: 'ciudad', length: 3, nullable: false })
    ciudad: string;

    @Column({ name: 'direccion', length: 100, nullable: false })
    direccion: string;

    @ManyToMany(() => Producto, (producto) => producto.tiendas)
    @JoinTable()
    productos?: Producto[] | null;

    
}
