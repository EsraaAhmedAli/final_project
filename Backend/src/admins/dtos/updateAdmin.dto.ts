/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

/* eslint-disable prettier/prettier */
export class UpdateAdminDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /*@IsOptional()
    @IsString()
    @Length(7, 20)
    password: string;  /* Problem ...............................*/
    
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean;

    @IsOptional()
    @IsArray()
    permissions_ids: number[]

    @IsOptional()
    @IsArray()
    faculties_ids: number[]
}