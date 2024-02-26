/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Permission } from "./permission.entity";
import { Faculty } from "./faculties.entity";

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    admin_id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    is_active: boolean;

    @ManyToMany(() => Permission, (permission) => permission.admins, {onDelete: 'CASCADE'})
    @JoinTable({
        name: 'admins_permissions',
        joinColumn:{
            name: 'admin_id',
            referencedColumnName: 'admin_id',
            foreignKeyConstraintName: 'admins_permissions_admin_id'
        },
        inverseJoinColumn:{
            name: 'permission_id',
            referencedColumnName: 'permission_id',
            foreignKeyConstraintName: 'admins_permissions_permission_id'
        }
    })
    permissions: Permission[];

    @ManyToMany(() => Faculty, (faculty) => faculty.admins, {onDelete: 'CASCADE'})
    @JoinTable({
        name: 'admins_faculties',
        joinColumn:{
            name: 'admin_id',
            referencedColumnName: 'admin_id',
            foreignKeyConstraintName: 'admins_faculties_admin_id'
        },
        inverseJoinColumn:{
            name: 'faculty_id',
            referencedColumnName: 'faculty_id',
            foreignKeyConstraintName: 'admins_faculties_faculty_id'
        }
    })
    faculties: Faculty[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 7);
    }

    async validatePassword(password: string): Promise<boolean>{
        return bcrypt.compare(password, this.password);
    }
}