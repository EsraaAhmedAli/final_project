/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateEventDto } from './event_dtos/createEvent.dto';
import { EventService } from './event.service';
import { UpdateEventDto } from './event_dtos/updateEvent.dto';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService){}

    @Post('/add')
    async create(@Body() dto: CreateEventDto){
        return await this.eventService.addEventToDB(dto);
    }

    @Patch('/update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateEventDto){
        return await this.eventService.updateEvent(id, payload);
    }

    @Get('/list')
    async list(){
        return this.eventService.findAll();
    }

    @Get('/:id')
    async view(@Param('id', ParseIntPipe) id: number){
        return this.eventService.findById(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.eventService.deleteEvent(id);
    }
}