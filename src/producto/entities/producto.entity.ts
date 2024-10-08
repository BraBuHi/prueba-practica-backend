import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre', length: 150, nullable: false })
    nombre: string;

    @Column({ name: 'precio', type: 'float', nullable: false })
    precio: number;

    @Column({ name: 'tipo', length: 100, nullable: false })
    tipo: string;


   // @ManyToMany(() => Store, (store) => store.products)
//    stores: Store[];
}