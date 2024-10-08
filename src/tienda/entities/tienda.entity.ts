import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity('tienda')
export class tienda {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombretienda', length: 150, nullable: false })
    nombretienda: string;

    @Column({ name: 'ciudad', length: 3, nullable: false })
    ciudad: string;

    @Column({ name: 'direccion', length: 100, nullable: false })
    direccion: string;


   // @ManyToMany(() => Store, (store) => store.products)
//    stores: Store[];
}
