/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admin.service';
import { AuthLoginDto } from './auth-login.dto';
import { CreateAdminDto } from 'src/admins/dtos/createAdmin.dto';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
    constructor(private adminService: AdminsService, private jwtService: JwtService){}

    public async check_newAdmin_data(createAdminDto: CreateAdminDto){
     //   const {email, password, is_active} = createAdminDto;
        const admin = await this.adminService.findByEmail(createAdminDto.email);
        //console.log(admin);
        if(admin == null){
            await this.adminService.addAdminToDB(createAdminDto);
            return createAdminDto;
        }
        else return 'This email is already exist';
    }

    async login(authLoginDto: AuthLoginDto, response: Response){
        const admin = await this.validateAdmin(authLoginDto);
        const payload = {
            adminId: admin.admin_id  
        };

        const access_token = this.jwtService.sign(payload);
        response.cookie('jwt', access_token, {httpOnly: true});
        return   access_token
           // message: 'success'
             
        
    }

    async validateAdmin(authLoginDto: AuthLoginDto){
        const {email, password} = authLoginDto;
        const admin = await this.adminService.findByEmail(email);
        //console.log(admin);
        if(!(await admin?.validatePassword(password)) || admin.is_active == false){
            throw new UnauthorizedException();
        }
        return admin;
    }

    async registeredAdmin(request: Request){
        try{
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            const admin = await this.adminService.findById(data['adminId']);
            if(!admin) throw new UnauthorizedException();
            const {password, ...result} = admin; // admin's data except password
            /*const {permissions, ...result2} = result1;
            const {faculties, ...result} = result2;*/
            return result; 
        }catch(ex){
            throw new UnauthorizedException();
        }
    }

    async logout(response: Response){
        response.clearCookie('jwt');
        return {
            message: 'success'
        }
    }
}