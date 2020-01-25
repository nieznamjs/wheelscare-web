import { Injectable } from '@nestjs/common';
import { sign, verify, SignOptions } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  public async generateToken(secret: string, payload: string|object|Buffer, options?: SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(payload, secret, options, (err: Error, token: string) => {
        if (err) { return reject(err); }

        resolve(token);
      });
    });
  }

  public async decodeToken<T>(token: string, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {
      verify(token, secret, {}, (err: Error, data: string|object) => {
        if (err) { return reject(err); }

        resolve(data as unknown as T);
      });
    });
  }

  public getTokenFromBearerString(val: string): string {
    return val.replace('Bearer ', '');
  }
}
