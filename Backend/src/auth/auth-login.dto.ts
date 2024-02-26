/* eslint-disable prettier/prettier */
import { IsEmail, IsString, Length } from "class-validator";

/* eslint-disable prettier/prettier */
export class AuthLoginDto{
    @IsEmail()
    email: string;

    @IsString()
    @Length(7, 20)
    password: string;
}