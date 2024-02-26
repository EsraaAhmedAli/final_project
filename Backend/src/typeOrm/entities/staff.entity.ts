/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";
import { Faculty } from "./faculties.entity";

@Entity('staff')
export class Staff{
    @PrimaryGeneratedColumn()
    staff_id: number;

    @Column()
    name: string;

    @Column()
    role: string;

    @ManyToOne(() => Department, (department) => department.staff, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'department_id'})
    department: Department

    @ManyToOne(() => Faculty, (faculty) => faculty.staff, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'faculty_id'})
    faculty: Faculty
}