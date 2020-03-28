import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '@purbanski-deftcode/wc-common';

export const AllowedUserRoles = (...roles: UserRoles[]) => SetMetadata('allowedUserRoles', roles);
