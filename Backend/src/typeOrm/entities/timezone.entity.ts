/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";

@Entity('timezone')
export class Timezone{
    @PrimaryGeneratedColumn()
    timezone_id: number;

    @Column()
    zone: string;
    
    @ManyToMany(() => Country, (countries) => countries.timezones)
    countries: Country[];
}