import { createParamDecorator } from '@nestjs/common';

import { IRequest } from '@interfaces';

export const UserData = createParamDecorator((data: any, req: IRequest) => req.userData);
