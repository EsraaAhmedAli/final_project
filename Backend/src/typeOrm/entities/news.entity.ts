/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./faculties.entity";

@Entity('news')
export class News{
    @PrimaryGeneratedColumn()
    news_id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    link: string;

    @ManyToMany(() => Faculty, (faculties) => faculties.news, {onDelete: 'CASCADE'})
    faculties: Faculty[];
}