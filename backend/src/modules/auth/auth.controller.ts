import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  public async registerUser(@Body() userData: RegisterUserDto): Promise<User> {
    return this.authService.register(userData);
  }
}
