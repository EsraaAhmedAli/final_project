/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timezone } from "./timezone.entity";

@Entity('country')
export class Country{
    @PrimaryGeneratedColumn()
    country_id: number;

    @Column()
    name: string;
    
    @ManyToMany(() => Timezone, (timezone) => timezone.countries)
    @JoinTable({
        name: 'countries_timezones',
        joinColumn:{
            name: 'country_id',
            referencedColumnName: 'country_id',
            foreignKeyConstraintName: 'countries_timezones_country_id'
        },
        inverseJoinColumn:{
            name: 'timezone_id',
            referencedColumnName: 'timezone_id',
            foreignKeyConstraintName: 'countries_timezones_timezone_id'
        }
    })
    timezones: Timezone[];
}