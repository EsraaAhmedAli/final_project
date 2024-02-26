/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateCountryDto{
    @IsString()
    name: string;
}