/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateAdminDto } from 'src/admins/dtos/createAdmin.dto';
import { Response, Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/add')
  async create(@Body() rowInserted: CreateAdminDto) {
    return await this.authService.check_newAdmin_data(rowInserted);
  }

  @Post('admin/login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res({passthrough: true}) response: Response){
    return this.authService.login(authLoginDto, response);
  }

  @Get('registered/admin')
  async admin(@Req() request: Request){
    return await this.authService.registeredAdmin(request);
  }

  @Post('admin/logout')
  async logout(@Res({passthrough: true}) response: Response){
    return await this.authService.logout(response);
  }

  /*@UseGuards(JwtAuthGuard)
  @Get('admin/login/success')
  async test(){
    return "Login Successfully";
  }*/
}