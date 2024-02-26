/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventParams, UpdateEventParams } from 'src/utils/event_types';
import { Event } from 'src/typeOrm/entities/event.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>){}
    
    async addEventToDB(eventDetails: CreateEventParams){
        const newEvent = this.eventRepository.create(eventDetails);
        newEvent.faculties = eventDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id})); 
        return await this.eventRepository.save(newEvent);
    }

    async updateEvent(id: number, eventDetails: UpdateEventParams){
        const ret = await this.eventRepository.findOne({where: {event_id: id}});
        if(ret == null) return `There is no event with id = ${id}`;
        if(eventDetails.title != undefined) ret.title = eventDetails.title;
        if(eventDetails.description != undefined) ret.description = eventDetails.description;
        if(eventDetails.link != undefined) ret.link = eventDetails.link;
        if(eventDetails.faculties_ids != undefined){
            ret.faculties = eventDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id}));
        }
        return await this.eventRepository.save(ret);
    }

    async findAll(){
        return await this.eventRepository.find();
    }

    async findById(event_id: number){
        const ret = await this.eventRepository.findOne({where: {event_id}});
        return (ret == null ? `There is no event with id = ${event_id}` : ret);
    }

    async deleteEvent(id: number){
        await this.eventRepository.delete(id);
        return 'This event is deleted successfully';
    }
}
