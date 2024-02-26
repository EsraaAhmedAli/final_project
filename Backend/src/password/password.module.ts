/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from '../typeOrm/entities/password.entity';
import { AdminModule } from 'src/admins/admin.module';
//import { AppModule } from 'src/app.module';

@Module({
    imports: [TypeOrmModule.forFeature([Password]), AdminModule /*forwardRef(() => AppModule)*/],
    controllers: [PasswordController],
    providers: [PasswordService],
   // exports: [PasswordService]
})
export class PasswordModule {}
