import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Cookies, Environments, Routes } from '@constants';
import { AppConfigService } from '@config';
import { SuccessResponseDto } from '@dtos';

import { AuthService } from './auth.service';
import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserResponseDto } from '../users/dtos';
import { errorSchemaFactory } from '../../common/helpers';
import { ApiErrors } from '@purbanski-deftcode/wc-common';

@ApiTags(Routes.Auth)
@Controller(Routes.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'Will return created user', type: UserResponseDto })
  public async registerUser(@Body() userData: RegisterUserDto): Promise<User> {
    return this.authService.register(userData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto, description: 'Beside success response it should return cookie with auth token' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user', schema: errorSchemaFactory(HttpStatus.UNAUTHORIZED, ApiErrors.UnauthorizedUser) })
  @ApiForbiddenResponse({ description: 'User not active', schema: errorSchemaFactory(HttpStatus.FORBIDDEN, ApiErrors.UserIsNotActive) })
  public async login(@Body() loginUsernDto: LoginUserDto, @Res() res: Response): Promise<void> {
    const { token } = await this.authService.authenticate(loginUsernDto);

    res.cookie(Cookies.AuthToken, token, {
      httpOnly: true,
      secure: this.appConfigService.environment === Environments.Production,
    });

    await res.json({ success: true });
  }
}
