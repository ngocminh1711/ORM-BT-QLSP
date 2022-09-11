import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public price: number;

    @Column()
    public name: string;

    @Column()
    public author: string;

    @Column()
    public avatar: string;
}
