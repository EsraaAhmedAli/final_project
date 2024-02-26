/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './department_dtos/createDepartment.dto';
import { UpdateDepartmentDto } from './department_dtos/updateDepartment.dto';

@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService){}

    @Post('/add')
    async create(@Body() dto: CreateDepartmentDto){
        return await this.departmentService.addDepartmentToDB(dto);
    }

    @Patch('/update/:id')
    async update(@Param('id') id: number, @Body() payload: UpdateDepartmentDto){
        return await this.departmentService.updateDepartment(id, payload);
    }

    @Get('/list')
    async list(){
        return await this.departmentService.findAll();
    }

    @Get('/:id')
    async view(@Param('id') id: number){
        return await this.departmentService.findById(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.departmentService.deleteDepartment(id);
    }
}