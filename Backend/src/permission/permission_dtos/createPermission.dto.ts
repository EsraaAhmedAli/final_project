/* eslint-disable prettier/prettier */
import { IsArray, IsString } from "class-validator";

export class CreatePermissionDto{
    @IsString()
    type: string;
 
    @IsArray()
    admins_ids: number[];
}