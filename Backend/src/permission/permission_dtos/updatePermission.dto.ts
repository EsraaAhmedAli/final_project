/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePermissionDto{
    @IsOptional()
    @IsString()
    type: string;
    
    @IsOptional()
    @IsArray()
    admins_ids: number[]; // ...........................
}