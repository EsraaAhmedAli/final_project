/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminsService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Admin, Permission,Faculty])],
    controllers: [AdminController],
    providers: [AdminsService],
    exports: [AdminsService],
})
export class AdminModule{

}