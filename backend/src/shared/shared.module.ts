import { Module } from '@nestjs/common';
import { HashService } from './services/hash.service';

@Module({
  exports: [
    HashService,
  ],
  providers: [
    HashService,
  ],
})
export class SharedModule {}
