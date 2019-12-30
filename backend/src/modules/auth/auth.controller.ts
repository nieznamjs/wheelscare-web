import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Routes, Cookies, Environments } from '../../common/constants';
import { AppConfigService } from '../../config/app-config.service';

@Controller(Routes.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Post('register')
  public async registerUser(@Body() userData: RegisterUserDto): Promise<User> {
    return this.authService.register(userData);
  }

  @Post('login')
  @HttpCode(200)
  public async login(@Body() loginUsernDto: LoginUserDto, @Res() res: Response): Promise<void> {
    const { token } = await this.authService.authenticate(loginUsernDto);

    res.cookie(Cookies.AuthToken, token, {
      httpOnly: true,
      secure: this.appConfigService.environment === Environments.Production,
    });

    await res.send();
  }
}
