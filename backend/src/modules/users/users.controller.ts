import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ReadAllResponse } from '@interfaces';
import { Routes } from '@constants';

import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { BaseUserDto } from './dtos/base-user.dto';
import { ReadUsersResponseDto } from './dtos/read-users-response.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

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
