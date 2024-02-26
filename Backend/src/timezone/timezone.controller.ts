/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { TimezoneService } from './timezone.service';
import { CreateTimezoneDto } from './timezone_dtos/createTimezone.dto';

@Controller('timezone')
export class TimezoneController {
    constructor(private timezoneService: TimezoneService){}

    @Post('create')
    async fun(@Body() payload: CreateTimezoneDto){
        this.timezoneService.create(payload);
    }
}
