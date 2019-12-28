import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public getHello(): string {
    return 'Hello World!';
  }
}
