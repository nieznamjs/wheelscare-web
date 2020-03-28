import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IRequest } from '@interfaces';
import { UserRoles } from '@purbanski-deftcode/wc-common';
import { UserRoleNotAllowedError } from '@errors';

@Injectable()
export class AllowedUserRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const allowedUserRoles = this.reflector.get<UserRoles[]>('allowedUserRoles', context.getHandler());

    if (!allowedUserRoles) {
      throw new Error('Allowed user roles decorator is needed in case of allowed user roles guard.');
    }

    const request: IRequest = context.switchToHttp().getRequest();
    const userData = request.userData;
    const hasAllowedUserRoles = allowedUserRoles.includes(request.userData.userRole);
    const isUserAllowed = userData && userData.userRole && hasAllowedUserRoles;

    if (!isUserAllowed) {
      throw new UserRoleNotAllowedError();
    }

    return true;
  }
}
