import { Body, Controller, Get, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ReadAllResponse } from '@interfaces';
import { Routes } from '@constants';

import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { BaseUserDto } from './dtos/base-user.dto';
import { ReadUsersResponseDto } from './dtos/read-users-response.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SuccessResponseDto } from '@dtos';
import { InitResetPasswordResponse } from 'src/common/interfaces/init-password-reset-response.interface';

@ApiTags(Routes.Users)
@Controller(Routes.Users)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiOkResponse({ type: ReadUsersResponseDto, description: 'List of users' })
  public async read(): Promise<ReadAllResponse<User>> {
    return this.usersService.read();
  }

  @Post()
  @ApiCreatedResponse({ type: BaseUserDto, description: 'Created user' })
  @ApiConflictResponse({ description: 'User already exists' })
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // -----------------

  @Get()
  @ApiOkResponse({ type: ReadUsersResponseDto, description: 'Get user data' })
  public async getUserByEmail(@Body() email: string): Promise<User> {
    return this.usersService.getUserByEmail(email);
  }

  @Post('init-password-reset')
  @ApiCreatedResponse({ type: SuccessResponseDto, description: 'Password reset initialization' })
  public async initResetPassword(@Body() initPasswordResetConfig: InitResetPasswordResponse) {
    return await this.usersService.initResetPassword(initPasswordResetConfig.email);
  }

  @Post(':id/reset-password')
  @ApiCreatedResponse({ type: SuccessResponseDto, description: 'Password reset' })
  public async setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<void> {
  //   try {
  //     var isNewPasswordChanged : boolean = false;
  //     if(resetPassword.email && resetPassword.currentPassword){
  //       var isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
  //       if(isValidPassword) {
  //         isNewPasswordChanged = await this.userService.setPassword(resetPassword.email, resetPassword.newPassword);
  //       } else {
  //         return new ResponseError("RESET_PASSWORD.WRONG_CURRENT_PASSWORD");
  //       }
  //     } else if (resetPassword.newPasswordToken) {
  //       var forgottenPasswordModel = await this.authService.getForgottenPasswordModel(resetPassword.newPasswordToken);
  //       isNewPasswordChanged = await this.userService.setPassword(forgottenPasswordModel.email, resetPassword.newPassword);
  //       if(isNewPasswordChanged) await forgottenPasswordModel.remove();
  //     } else {
  //       return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR");
  //     }
  //     return new ResponseSuccess("RESET_PASSWORD.PASSWORD_CHANGED", isNewPasswordChanged);
  //   } catch(error) {
  //     return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR", error);
  //   }
  }
}
