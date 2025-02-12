import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { UserType } from '../domain/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly service: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest()

        const userId = request.user.userId
        const user = await this.service.findOneUserById(userId)
        if (!user) {
            throw new NotFoundException("User Not Found")
        }

        for (const role of requiredRoles) {
            if (user.userType == role) {
                switch (role) {
                    case UserType.USER:
                    case UserType.ADMIN:
                        const business = await this.service.findOneUserById(userId)
                        if (!business) {
                            throw new NotFoundException("User Not Found while validation of login")
                        }
                        request.user = business;
                        return true
                    default:
                        return false
                }
            }
        }
        return false;
    }
}