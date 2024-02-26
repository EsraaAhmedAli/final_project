/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './permission_dtos/createPermission.dto';
import { UpdatePermissionDto } from './permission_dtos/updatePermission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private permissionService: PermissionService){}

    @Post('/add')
    create(@Body() dto: CreatePermissionDto){
      return this.permissionService.addPermission(dto);
    }

    @Patch('/update/:id')
    async update(@Param('id') id: number, @Body() payload: UpdatePermissionDto){
      return await this.permissionService.updatePermission(id, payload);
    }

    @Get('/list')
    list(){
      return this.permissionService.listPermissions();
    }

    @Get('/:id')
    view(@Param('id') id: number){
      return this.permissionService.viewPermission(id);
    }

    @Delete('/delete/:id')
    delete(@Param('id') id: number){
      this.permissionService.deletePermission(id);
    }
}