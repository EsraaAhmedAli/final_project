/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString } from "class-validator";
import { Staff } from "src/typeOrm/entities/staff.entity";

export class UpdateDepartmentDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    staff: Staff[];
}