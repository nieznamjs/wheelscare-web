import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public getHello(): string {
    return 'Hello World!';
  }
}
