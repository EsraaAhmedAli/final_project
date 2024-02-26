/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/typeOrm/entities/staff.entity';
import { CreateStaffParams, UpdateStaffParams } from 'src/utils/staff_types';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>){}
    
    async addStaffToDB(staffDetails: CreateStaffParams){
        const newStaff  = this.staffRepository.create({ ...staffDetails });
        return await this.staffRepository.save(newStaff);
    }

    async updateStaff(id: number, updateStaffParams: UpdateStaffParams){
        const ret = await this.staffRepository.findOne({where: {staff_id: id}});
        if(ret == null) return `There is no staff with id = ${id}`;
        await this.staffRepository.update(id, updateStaffParams);
        return updateStaffParams;
    }

    async findAll(){
        return await this.staffRepository.find();
    }

    async findById(id: number){
        const ret = await this.staffRepository.findOne({where: {staff_id: id}});
        return (ret == null ? `There is no staff with id = ${id}`: ret);
    }

    async deleteStaff(id: number){
        await this.staffRepository.delete(id);
        return 'This staff is deleted successfully';
    }
}
