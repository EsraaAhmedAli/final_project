/* eslint-disable prettier/prettier */
import { IsArray, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateTimezoneDto{
    @IsString()
    zone: string;

    @IsArray()
    countriesIds: number[];
}