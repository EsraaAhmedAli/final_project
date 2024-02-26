/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

/* eslint-disable prettier/prettier */
export class UpdateNewsDto{
    @IsOptional()   
    @IsString()
    title: string;
    
    @IsOptional()
    @ApiProperty({ example: `This is a multi-line
    string`, description: 'Description of the attribute' })
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    link: string;

    @IsOptional()
    @IsArray()
    faculties_ids: number[]
}