/* eslint-disable prettier/prettier */
import { IsArray, IsString } from "class-validator";
import { Staff } from "src/typeOrm/entities/staff.entity";

export class CreateDepartmentDto{
    @IsString()
    name: string;

    @IsArray()
    staff: Staff[];
}