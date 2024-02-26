/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('password_resets')
export class Password{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({unique: true})
    token: string;
}