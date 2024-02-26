/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/typeOrm/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService]
})
export class CountryModule {}
