/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admins/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { AdminNewMiddleware } from 'src/faculties/middleware/admins.middleware';
import { PermissionService } from 'src/permission/permission.service';
import { Admin } from 'src/typeOrm/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission,Admin]),
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory:async () => ({
        secret: "aya&alaa&esraa"
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AdminNewMiddleware, PermissionService],
  exports: [AuthService],
})
export class AuthModule {}
