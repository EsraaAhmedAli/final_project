/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './country_dtos/createCountry.dto';

@Controller('country')
export class CountryController {
    constructor(private countryService: CountryService){}

    @Post('/create')
    fun(@Body() dto: CreateCountryDto){
        return this.countryService.create(dto);
    }
}
