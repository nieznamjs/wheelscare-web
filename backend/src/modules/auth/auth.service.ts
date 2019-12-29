import { Injectable } from '@nestjs/common';

import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  public async register(userData: RegisterUserDto): Promise<User> {
    return this.usersService.create(userData);
  }
}
