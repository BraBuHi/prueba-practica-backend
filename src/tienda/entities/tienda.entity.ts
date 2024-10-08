import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


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


    //@ManyToMany(() => Product, (product) => product.stores)
   // @JoinTable()
    //products?: Product[] | null;
}
