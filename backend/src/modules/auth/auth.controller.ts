import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
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
import { SuccessResponseDto } from '@dtos';

import { AuthService } from './auth.service';
import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserResponseDto } from '../users/dtos';
import { RegisterUserViaGoogleDto } from './dtos/register-user-via-google.dto';
import { LoginUserViaGoogleDto } from './dtos/login-user-via-google.dto';
import { RegisterUserViaFacebookDto } from './dtos/register-user-via-facebook.dto';
import { LoginUserViaFacebookDto } from './dtos/login-user-via-facebook.dto';

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

  @Post('register/google')
  @ApiCreatedResponse({ description: 'Beside success response it should return cookie with auth token', type: SuccessResponseDto })
  public async registerUserViaGoogle(@Body() tokenData: RegisterUserViaGoogleDto, @Res() res: Response): Promise<void> {
    const { token } = await this.authService.registerViaGoogle(tokenData.token);

    res.cookie(Cookies.AuthToken, token, {
      httpOnly: true,
      secure: this.appConfigService.environment === Environments.Production,
    });

    await res.json({ success: true });
  }

  @Post('register/facebook')
  @ApiCreatedResponse({ description: 'Beside success response it should return cookie with auth token', type: SuccessResponseDto })
  public async registerUserViaFacebook(@Body() tokenData: RegisterUserViaFacebookDto, @Res() res: Response): Promise<void> {
    const { token } = await this.authService.registerViaFacebook(tokenData.token);

    res.cookie(Cookies.AuthToken, token, {
      httpOnly: true,
      secure: this.appConfigService.environment === Environments.Production,
    });

    await res.json({ success: true });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto, description: 'Besides success response it should return cookie with auth token' })
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

  @Post('login/google')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto, description: 'Besides success response it should return cookie with auth token' })
  public async loginViaGoogle(@Body() tokenData: LoginUserViaGoogleDto, @Res() res: Response): Promise<void> {
    const { token } = await this.authService.loginViaGoogle(tokenData.token);

    res.cookie(Cookies.AuthToken, token, {
      httpOnly: true,
      secure: this.appConfigService.environment === Environments.Production,
    });

    await res.json({ success: true });
  }

  @Post('login/facebook')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SuccessResponseDto, description: 'Besides success response it should return cookie with auth token' })
  public async loginViaFacebook(@Body() tokenData: LoginUserViaFacebookDto, @Res() res: Response): Promise<void> {
    const { token } = await this.authService.loginViaFacebook(tokenData.token);

    res.cookie(Cookies.AuthToken, token, {
      httpOnly: true,
      secure: this.appConfigService.environment === Environments.Production,
    });

    await res.json({ success: true });
  }
}
