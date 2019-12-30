import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { ReadAllResponse } from '../../common/interfaces/read-all-response.interface';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  public async read(): Promise<ReadAllResponse<User>> {
    return this.usersService.read();
  }

  @Get(':id')
  public async readOne(): Promise<User> {
    return null;
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  public async update(): Promise<User> {
    return null;
  }

  @Delete(':id')
  public async delete(): Promise<User> {
    return null;
  }
}
