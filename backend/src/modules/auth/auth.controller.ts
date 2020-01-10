import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Routes, Cookies, Environments } from '@constants';
import { AppConfigService } from '@config';

import { AuthService } from './auth.service';
import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { SuccessResponseDto } from '@dtos';

@ApiTags(Routes.Auth)
@Controller(Routes.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Post('register')
  // TODO: add when response for create user will be ready
  // @ApiCreatedResponse({ description: 'Will return created user', type: RegisterResponseDto })
  @ApiForbiddenResponse({ description: 'Not enough permissions' })
  public async registerUser(@Body() userData: RegisterUserDto): Promise<User> {
    return this.authService.register(userData);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ type: SuccessResponseDto, description: 'Beside success response it should return cookie with auth token' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user' })
  @ApiForbiddenResponse({ description: 'User not active'})
  public async login(@Body() loginUsernDto: LoginUserDto, @Res() res: Response): Promise<void> {
    const { token } = await this.authService.authenticate(loginUsernDto);

    res.cookie(Cookies.AuthToken, token, {
      httpOnly: true,
      secure: this.appConfigService.environment === Environments.Production,
    });

    await res.json({ success: true });
  }
}
