/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/admins/admin.module';
import { AdminNewMiddleware } from 'src/faculties/middleware/admins.middleware';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/typeOrm/entities/admin.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Permission,Admin]), AdminModule],
  controllers: [PermissionController],
  providers: [PermissionService, AdminNewMiddleware, AuthService, JwtService],
  exports:[PermissionService]
})
export class PermissionModule {}
