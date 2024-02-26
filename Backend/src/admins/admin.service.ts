/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/typeOrm/entities/admin.entity';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { Permission } from 'src/typeOrm/entities/permission.entity';
import { CreateAdminParams, UpdateAdminParams } from 'src/utils/admin_types';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from './dtos/updateAdmin.dto';

@Injectable()
export class AdminsService {
    constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>, @InjectRepository(Permission) private permissionRepository: Repository<Permission>, @InjectRepository(Faculty) private facultyRepository: Repository<Faculty>){}
    
    async addAdminToDB(adminDetails: CreateAdminParams){
        const newAdmin: any = this.adminRepository.create({ ...adminDetails });
        newAdmin.permissions = adminDetails.permissions_ids.map(permission_id => ({...new Permission(), permission_id})); 
        newAdmin.faculties = adminDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id})); 
        return await this.adminRepository.save(newAdmin);
    }

    async updateAdmin(id: number, updateAdminDetails: UpdateAdminDto) {
        const ret = await this.adminRepository.findOne({ where: { admin_id: id }, relations: ['permissions', 'faculties'] });
        if (!ret) return `There is no admin with id = ${id}`;
    
        if (updateAdminDetails.email !== undefined) {
            if (updateAdminDetails.email !== ret.email) {
                const checkEmail = await this.adminRepository.findOne({ where: { email: updateAdminDetails.email } });
                if (checkEmail) return 'This email is already exist';
            }
            ret.email = updateAdminDetails.email;
        }
        
        if (updateAdminDetails.name !== undefined) ret.name = updateAdminDetails.name;
        if (updateAdminDetails.is_active !== undefined) ret.is_active = updateAdminDetails.is_active;
        if (updateAdminDetails.permissions_ids !== undefined) {
            ret.permissions = await Promise.all(updateAdminDetails.permissions_ids.map(async permission_id => {
                const permission = await this.permissionRepository.findOne({where: {permission_id: permission_id}});
                if (!permission) throw new Error(`Permission with ID ${permission_id} not found`);
                return permission;
            }));
        }
        if (updateAdminDetails.faculties_ids !== undefined) {
            ret.faculties = await Promise.all(updateAdminDetails.faculties_ids.map(async faculty_id => {
                const faculty = await this.facultyRepository.findOne({where:{faculty_id:faculty_id}});
                if (!faculty) throw new Error(`Faculty with ID ${faculty_id} not found`);
                return faculty;
            }));
        }
    
        return await this.adminRepository.save(ret);
    }
    
    
    

    /* async findAll(){
        return await this.adminRepository.find();
    }*/

    findAll(): Promise<Admin[]>{
        return this.adminRepository.find({relations: {permissions: true, faculties: true}});
    }

    //-----------------------------------
    async createStatic(){
        const admin1 = this.adminRepository.create({ email: "aaamzzmmlll", password: "66666662", is_active: false });
        const admin2 = this.adminRepository.create({ email: "aaavaavvlllooooo", password: "aslsklsklkslkl", is_active: false });
        await this.adminRepository.save(admin1);
        await this.adminRepository.save(admin2);

        const permission = new Permission();
        permission.type = "add news";
        permission.admins = [admin1, admin2];
        await this.permissionRepository.save(permission);
    }
    //-----------------------------------
    
    async findByEmail(email: string){
        return await this.adminRepository.findOne({where: {email: email}});
    }

    // Problem............................
    async findById(admin_id: number): Promise<any> {
        const ret = await this.adminRepository.findOne({where:{admin_id}, relations:{permissions: true,faculties:true}});
        return(ret == null ? `There is no admin with id = ${admin_id}` : ret); 
    }
    
    async findOne(condition: any): Promise<Admin>{
        return await this.adminRepository.findOne(condition);
    }

    async update(id: number, data: any){
        return await this.adminRepository.update(id, data);
    }
    //-------------------------------------------------------
}