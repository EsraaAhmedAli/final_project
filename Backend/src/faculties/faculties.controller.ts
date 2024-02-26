/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { CreateFacultyDto } from './dtos/CreateFaculty.dto';
import { UpdateFacultyDto } from './dtos/UpdateFaculty.dto';
import { AdminNewMiddleware } from './middleware/admins.middleware';

@Controller('faculty')
export class FacultiesController {
    constructor(private facultyService: FacultiesService) {}
 
    //@UseGuards(AdminNewMiddleware)
    @Post('/add')
    async create(@Body() createfacultyDto: CreateFacultyDto) {
        return await this.facultyService.createFaculty(createfacultyDto);
    }

    @Get('/list') // list
    async list() {
        return await this.facultyService.findAll();
    }

    @Get('/:id') // view
    async view(@Param('id') id: number) {
        return await this.facultyService.findById(id);
    }

    @Patch('/update/:id')
    async update(@Param('id') id: number, @Body() updateFacultyDto: UpdateFacultyDto) {
        return await this.facultyService.updateFaculty(id, updateFacultyDto);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number) {
        await this.facultyService.deleteFaculty(id);
    }
}