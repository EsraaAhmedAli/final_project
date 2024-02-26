/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/typeOrm/entities/country.entity';
import { Repository } from 'typeorm';
import { CreateCountryParams } from 'src/utils/country_types';

@Injectable()
export class CountryService {
    constructor(@InjectRepository(Country) private countryRepository: Repository<Country>,){}
    
    async create(countryDetails: CreateCountryParams){
       // return 'create country';
        const country = this.countryRepository.create({ ...countryDetails });
       // coun.countries = timezoneDetails.countriesIds.map(id => ({...new Country(), id})); 
        return await this.countryRepository.save(country);
    }
}
