/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./admin.entity";

@Entity('permissions')
export class Permission{
    @PrimaryGeneratedColumn()
    permission_id: number;

    @Column()
    type: string;

    @ManyToMany(() => Admin, (admins) => admins.permissions, {onDelete: 'CASCADE'})
    admins: Admin[];
}