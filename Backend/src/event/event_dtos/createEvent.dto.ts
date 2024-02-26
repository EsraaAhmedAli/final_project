/* eslint-disable prettier/prettier */
import { IsArray, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

/* eslint-disable prettier/prettier */
export class CreateEventDto{
    @IsString()
    title: string;
    
    @ApiProperty({ example: `This is a multi-line
    string`, description: 'Description of the attribute' })
    @IsString()
    description: string;

    @IsString()
    link: string;

    @IsArray()
    faculties_ids: number[]
}