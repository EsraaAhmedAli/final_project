/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
/* eslint-disable prettier/prettier */

export class CreateAdminDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(7, 20)
    password: string;

    @IsBoolean()
    is_active: boolean;

    @IsArray()
    permissions_ids: number[]

    @IsArray()
    faculties_ids: number[]
}