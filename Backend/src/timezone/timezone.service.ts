/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timezone } from 'src/typeOrm/entities/timezone.entity';
import { Repository } from 'typeorm';
import { Country } from 'src/typeOrm/entities/country.entity';
import { CreateTimezoneParams } from 'src/utils/timezone_types';

@Injectable()
export class TimezoneService {
    constructor(@InjectRepository(Timezone) private timezoneRepository: Repository<Timezone>,){}
    
    create(timezoneDetails: CreateTimezoneParams){
        const timezone = this.timezoneRepository.create({...timezoneDetails});
        timezone.countries = timezoneDetails.countriesIds.map(country_id => ({...new Country(), country_id})); 
        return this.timezoneRepository.save(timezone);
    }
}