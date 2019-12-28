import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public async read(): Promise<string> {
    return 'test';
  }

  @Post()
  public async create(): Promise<any> { // TODO: add interface
    //
  }
}
