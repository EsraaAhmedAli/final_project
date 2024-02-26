/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from '../typeOrm/entities/password.entity';
import { Repository } from 'typeorm';
//import { Admin } from 'src/typeOrm/entities/admin.entity';

@Injectable()
export class PasswordService {
    constructor(@InjectRepository(Password) private readonly passwordRepository: Repository<Password>,){}

    async create(body: any){
        return this.passwordRepository.save(body);
    }

    async findOne(data: any){
        return this.passwordRepository.find(data);
    }
}
