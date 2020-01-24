import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Headers, UseGuards } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ReadAllResponse } from '@interfaces';
import { FindAllQueryDto } from '@dtos';
import { Routes } from '@constants';

import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { BaseUserDto } from './dtos/base-user.dto';
import { ReadUsersResponseDto } from './dtos/read-users-response.dto';
import { SuccessResponseDto } from '@dtos';
import { InitResetPasswordResponse } from 'src/common/interfaces/init-password-reset-response.interface';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { ResetPasswordGuard } from '../../common/guards/reset-password.guard';

@ApiTags(Routes.Users)
@Controller(Routes.Users)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiOkResponse({ type: ReadUsersResponseDto, description: 'List of users' })
  public async read(@Query() findAllQueryDto: FindAllQueryDto): Promise<ReadAllResponse<User>> {
    return this.usersService.read(findAllQueryDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto, description: 'Single user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  public async readOne(@Param('id') id: string): Promise<User> {
    return this.usersService.readOne(id);
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
  public async initResetPassword(@Body() initPasswordResetConfig: InitResetPasswordResponse): Promise<void> {
    return await this.usersService.initResetPassword(initPasswordResetConfig.email);
  }

  @Post(':id/reset-password')
  @ApiCreatedResponse({ type: SuccessResponseDto, description: 'Password reset' })
  @UseGuards(ResetPasswordGuard)
  public async setNewPassord(
    @Body('newPassword') newPassword: string,
    @Param('id') id: string,
  ): Promise<User> {
    return await this.usersService.resetPassword(id, newPassword);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BaseUserDto, description: 'Deleted user'})
  public async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Patch()
  @ApiOkResponse({ type: UpdateUserDto, description: 'Updated user'})
  public async update(@Body() userData: UpdateUserDto): Promise<User> {
    return this.usersService.update(userData);
  }
}
