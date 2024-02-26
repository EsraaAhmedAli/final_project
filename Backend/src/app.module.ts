/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './typeOrm/entities/admin.entity';
import { AdminModule } from './admins/admin.module';
import { AuthModule } from './auth/auth.module';
import { Permission } from './typeOrm/entities/permission.entity';
import { PermissionModule } from './permission/permission.module';
import { PasswordModule } from './password/password.module';
import { Password } from './typeOrm/entities/password.entity';
import { FacultiesModule } from './faculties/faculties.module';
import { Country } from './typeOrm/entities/country.entity';
import { Timezone } from './typeOrm/entities/timezone.entity';
import { CountryModule } from './country/country.module';
import { TimezoneModule } from './timezone/timezone.module';
import { EventModule } from './event/event.module';
import { Event } from './typeOrm/entities/event.entity';
import { NewsModule } from './news/news.module';
import { News } from './typeOrm/entities/news.entity';
import { Department } from './typeOrm/entities/department.entity';
import { DepartmentModule } from './department/department.module';
import { Staff } from './typeOrm/entities/staff.entity';
import { StaffModule } from './staff/staff.module';
import { Faculty } from './typeOrm/entities/faculties.entity';

@Module({
  imports: [ AdminModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'graduation_project_db',
      entities: [Admin, Permission, Password, Faculty, Country, Timezone, Event, News, Department, Staff],
      synchronize: true,
    }),
    AuthModule,
    PermissionModule,
    PasswordModule,
    FacultiesModule,
    CountryModule,
    TimezoneModule,
    EventModule,
    NewsModule,
    DepartmentModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
