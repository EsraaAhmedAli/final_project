/* eslint-disable prettier/prettier */
// src/middleware/admin.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service'; 
import { PermissionService } from 'src/permission/permission.service';
import { AuthLoginDto } from '../../auth/auth-login.dto';
//import { Permission } from 'src/typeOrm/entities/permission.entity';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService, private readonly permissionService:PermissionService) {} 
    
    async use(req: any, res: any, next: (error?: any) => void) {
        //throw new Error('Method not implemented.');
        const authLoginDto = new AuthLoginDto(); 
        const UserId = (await this.authService.validateAdmin(authLoginDto)).admin_id;
        const userRoles = await this.permissionService.getUserRoles(UserId);
        if(userRoles.includes('add faculties')) next();
        else res.status(403).json({ message: 'Unauthorized' });
    }
  }

 // async use(req: Request, res: Response, next: NextFunction) {
   // 