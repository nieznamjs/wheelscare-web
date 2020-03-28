import { UserRoles } from '@purbanski-deftcode/wc-common';
import { TokenTypes } from '@constants';

export interface AuthTokenPayload {
  userId: string;
  userRole: UserRoles;
  type: TokenTypes.Auth;
}
