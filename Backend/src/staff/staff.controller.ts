/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './staff_dtos/createStaff.dto';
import { UpdateStaffDto } from './staff_dtos/updateStaff.dto';

@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService){}

    @Post('/add')
    async create(@Body() dto: CreateStaffDto){
        return await this.staffService.addStaffToDB(dto);
    }

    @Patch('/update/:id')
    async update(@Param('id') id: number, @Body() payload: UpdateStaffDto){
        return await this.staffService.updateStaff(id, payload);
    }

    @Get('/list')
    async list(){
        return await this.staffService.findAll();
    }

    @Get('/:id')
    async view(@Param('id') id: number){
        return await this.staffService.findById(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.staffService.deleteStaff(id);
    }
}