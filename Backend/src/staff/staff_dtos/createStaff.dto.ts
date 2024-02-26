/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateStaffDto{
    @IsString()
    name: string;

    @IsString()
    role: string;
}