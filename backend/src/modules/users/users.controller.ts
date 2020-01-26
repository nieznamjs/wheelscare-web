import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ReadAllResponse } from '@interfaces';
import { FindAllQueryDto, SuccessResponseDto } from '@dtos';
import { Routes } from '@constants';

import { User } from './users.entity';
import { UsersService } from './users.service';
import {
  BaseUserDto,
  CreateUserDto,
  InitPasswordResetDto, PasswordResetDto,
  ReadUsersResponseDto,
  UpdateUserDto,
  UserResponseDto,
} from './dtos';
import { AccountActivationGuard, ResetPasswordGuard } from './guards';

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

  @Get()
  @ApiOkResponse({ type: ReadUsersResponseDto, description: 'Get user data' })
  public async getUserByEmail(@Body() email: string): Promise<User> {
    return this.usersService.getUserByEmail(email);
  }

  @Post('init-password-reset')
  @ApiCreatedResponse({ type: SuccessResponseDto, description: 'Password reset initialization' })
  public async initResetPassword(@Body() initPasswordResetDto: InitPasswordResetDto): Promise<SuccessResponseDto> {
    await this.usersService.initResetPassword(initPasswordResetDto.email);

    return { success: true };
  }

  @Post(':id/reset-password')
  @ApiCreatedResponse({ type: SuccessResponseDto, description: 'Password reset' })
  @UseGuards(ResetPasswordGuard)
  public async resetPassword(@Body() passwordResetDto: PasswordResetDto, @Param('id') id: string): Promise<SuccessResponseDto> {
    await this.usersService.resetPassword(id, passwordResetDto.newPassword);

    return { success: true };
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

  @UseGuards(AccountActivationGuard)
  @Post(':id/activate')
  @ApiOkResponse({type: SuccessResponseDto, description: 'User activated'} )
  public async activateUser(@Param('id') id: string): Promise<SuccessResponseDto> {
    await this.usersService.activateUser(id);

    return { success: true };
  }
}
