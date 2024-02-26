/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {Body, Controller, Param, Patch, Post} from '@nestjs/common';
import { AdminsService } from './admin.service';
import { UpdateAdminDto } from './dtos/updateAdmin.dto';
import { Get } from '@nestjs/common';

@Controller('admin')
export class AdminController{
    constructor(private adminService: AdminsService){}
    
    @Patch('update/:id')
    async updateAdmin(@Param('id') id: number, @Body() payload: UpdateAdminDto){
      return await this.adminService.updateAdmin(id, payload);
    }

    @Post('static')
    async tryStatic(){
      return await this.adminService.createStatic();
    }

    @Get('/list')
    async listAdmins(){
      return await this.adminService.findAll();
    }

    @Get('/:id')
    async viewAdmin(@Param('id') id: number){
      return await this.adminService.findById(id);
    }
}