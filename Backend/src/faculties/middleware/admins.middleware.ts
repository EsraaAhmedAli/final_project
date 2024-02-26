/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// admin.middleware.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthLoginDto } from 'src/auth/auth-login.dto';
import { AuthService } from 'src/auth/auth.service';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class AdminNewMiddleware implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly permissionService: PermissionService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Extract the user ID or any necessary data from the request
        const request = context.switchToHttp().getRequest();
        const authLoginDto = new AuthLoginDto(); // Create an instance of AuthLoginDto
        
        const user = await this.authService.validateAdmin(authLoginDto);
        const userId = user?.admin_id;

        if (!userId) {
            // Handle the case where the user is not found or validation fails
            return false;
        }

        // Retrieve user roles using the PermissionService
        const userRoles = await this.permissionService.getUserRoles(userId);

        // Your custom logic for checking user roles
        if(userRoles.includes('add faculties')) return true;
        else {
            const response = context.switchToHttp().getResponse();
            response.status(403).json({ message: 'Unauthorized' });
            return false;
        }
    }
}
