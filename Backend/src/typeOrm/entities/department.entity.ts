/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "./staff.entity";
import { Faculty } from "./faculties.entity";

@Entity('departments')
export class Department{
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column()
  name: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.departments, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'faculty_id'})
  faculty: Faculty

  @OneToMany(() => Staff, (staff) => staff.department)
  staff: Staff[]
}