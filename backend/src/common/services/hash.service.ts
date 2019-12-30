import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  private readonly SALT_ROUNDS = 12;

  public async encrypt(text: string): Promise<string> {
    return hash(text, this.SALT_ROUNDS);
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
