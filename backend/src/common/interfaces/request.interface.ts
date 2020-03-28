import { Request } from 'express';
import { UserRoles } from '@purbanski-deftcode/wc-common';

export interface IRequest extends Request {
  userData: {
    userId: string;
    userRole: UserRoles;
  };
}
