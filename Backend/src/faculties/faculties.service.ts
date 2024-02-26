/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Department } from 'src/typeOrm/entities/department.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { Staff } from 'src/typeOrm/entities/staff.entity';
import { CreateFacultyParams, UpdateFacultyParams } from 'src/utils/faculty_types';
import { Repository } from 'typeorm';

@Injectable()
export class FacultiesService {
    constructor(@InjectRepository(Faculty) private facultyRepository: Repository<Faculty>){}
    
    async findAll() {
        return await this.facultyRepository.find({relations: {departments: true, staff: true}});
    }
    
    async findById(faculty_id: number) {
        const ret = await this.facultyRepository.findOne({where: {faculty_id}, relations: {departments: true, staff: true}});
        return (ret == null ? `There is no faculty with id = ${faculty_id}` : ret);
    }

    async createFaculty(facultyDetails: CreateFacultyParams) {
        const newFaculty: any = this.facultyRepository.create({...facultyDetails});
        newFaculty.admins = facultyDetails.admins_ids.map(admin_id => ({...new Admin(), admin_id})); 
        newFaculty.departments = facultyDetails.departments.map(department_id => ({...new Department(), department_id})); 
        newFaculty.staff = facultyDetails.staff.map(staff_id => ({...new Staff(), staff_id})); 
        const check_faculty = await this.facultyRepository.findOne({where: {name: facultyDetails.name}});
        if(check_faculty) return 'This faculty is already exist';
        return await this.facultyRepository.save(newFaculty);
    }
    
    async updateFaculty(faculty_id: number, updateFacultiesDetails: UpdateFacultyParams) {
        const ret: any = await this.facultyRepository.findOne({ where: { faculty_id }, relations: {departments: true, staff: true}});
        if(ret == null) return `There is no faculty with id = ${faculty_id}`;
        if(updateFacultiesDetails.name != undefined){
            const check_faculty = await this.facultyRepository.findOne({where: {name: updateFacultiesDetails.name}});
            if(check_faculty) return 'This faculty is already exist';
            ret.name = updateFacultiesDetails.name;
        }
        if(updateFacultiesDetails.dean_name != undefined){
            ret.dean_name = updateFacultiesDetails.dean_name;
        }
        if(updateFacultiesDetails.departments != undefined){
            ret.departments = updateFacultiesDetails.departments.map(department_id => ({...new Department(), department_id})); 
        }
        if(updateFacultiesDetails.admins_ids != undefined){
            ret.admins = updateFacultiesDetails.admins_ids.map(admin_id => ({...new Admin(), admin_id})); 
        }
        if(updateFacultiesDetails.staff != undefined){
            ret.staff = updateFacultiesDetails.staff.map(staff_id => ({...new Staff(), staff_id})); 
        }
        return await this.facultyRepository.save(ret);
    }

    async deleteFaculty(faculty_id: number) {
        await this.facultyRepository.delete({faculty_id});
        return 'This faculty is deleted successfully';
    }
}