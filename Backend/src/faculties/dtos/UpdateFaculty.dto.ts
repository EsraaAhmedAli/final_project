/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Department } from "src/typeOrm/entities/department.entity";
import { Staff } from "src/typeOrm/entities/staff.entity";

export class UpdateFacultyDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  dean_name: string;

  @IsOptional()
  @IsArray()
  admins_ids: number[];

  @IsOptional()
  @IsArray()
  departments: Department[];

  @IsOptional()
  @IsArray()
  staff: Staff[];
}