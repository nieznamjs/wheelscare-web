import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  public async hash(text: string): Promise<string> {
    return hash(text, 10);
  }

  public async compare(text: string, encodedText: string): Promise<boolean> {
    return compare(text, encodedText);
  }
}
