/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';
import { PasswordService } from './password.service';
import * as bcrypt from 'bcryptjs';
import { AdminsService } from 'src/admins/admin.service';

var url = "";

@Controller()
export class PasswordController {
    constructor(private passwordService: PasswordService, private adminService: AdminsService/* @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>, /*private appService: AppService*/){}

    @Post('password/forget')
    async forgot(@Body('email') email: string){
        const token = Math.random().toString(20).substring(2, 12); //generate random token
        await this.passwordService.create({ email, token });
        url = `http://localhost:3000/reset/${token}`;
        return url;
    }

    @Post('reset/:str')
    async reset(@Param() params: any, @Body('token') token: string, @Body('password') password: string, @Body('confirm_password') confirm_password: string){
       // console.log(params.str);
        if(token != params.str) return 'Incorrect token';
        if(password !== confirm_password){
            throw new BadRequestException('Passwords don\'t match');
        }
        if(password.length < 7 || password.length > 20){ 
            return 'The password length must be from 7 to 20 characters';
        }
        const passwordReset: any = await this.passwordService.findOne({token});
        //return passwordReset[passwordReset.length-1].email;
        const admin = await this.adminService.findOne({where: {email: passwordReset[passwordReset.length-1].email}});
        if(!admin){
            throw new NotFoundException('Admin with this token doesn\'t exist');
        }
        const hashedPassword = await bcrypt.hash(password, 7);
        await this.adminService.update(admin.admin_id, {password: hashedPassword});
        return 'The password is updated successfully';
    }
}