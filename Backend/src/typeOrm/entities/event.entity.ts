/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Faculty } from "./faculties.entity";

@Entity('events')
export class Event{
    @PrimaryGeneratedColumn()
    event_id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    link: string;

    @ManyToMany(() => Faculty, (faculties) => faculties.events, {onDelete: 'CASCADE'})
    faculties: Faculty[];
}