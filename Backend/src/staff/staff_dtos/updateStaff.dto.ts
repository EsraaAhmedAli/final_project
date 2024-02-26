/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";

export class UpdateStaffDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    role: string;
}