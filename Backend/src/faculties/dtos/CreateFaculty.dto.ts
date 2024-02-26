/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Department } from "src/typeOrm/entities/department.entity";
import { Staff } from "src/typeOrm/entities/staff.entity";

export class CreateFacultyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  dean_name: string;

  @IsArray()
  admins_ids: number[];

  @IsArray()
  departments: Department[];

  @IsArray()
  staff: Staff[];
}