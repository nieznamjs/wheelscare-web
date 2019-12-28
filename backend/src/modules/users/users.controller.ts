import { Body, Controller, Get, Post } from '@nestjs/common';

import { ReadAllResponse } from '../../shared/interfaces/read-all-response.interface';
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

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
