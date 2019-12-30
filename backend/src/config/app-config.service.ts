import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}

interface AuthConfig {
  basicSecret: string;
}

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  public get database(): DatabaseConfig { return this.configService.get('database'); }

  public get port(): number { return this.configService.get('port'); }

  public get environment(): string { return this.configService.get('environment'); }

  public get auth(): AuthConfig { return this.configService.get('auth'); }
}
