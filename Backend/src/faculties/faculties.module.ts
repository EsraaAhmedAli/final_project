/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { AuthService } from 'src/auth/auth.service';
import { AdminsService } from 'src/admins/admin.service';
import { JwtService } from '@nestjs/jwt';
import { PermissionService } from 'src/permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty, Admin, Permission])],
  controllers: [FacultiesController],
  providers: [FacultiesService, AuthService, AdminsService, JwtService, PermissionService]
})
export class FacultiesModule {}
