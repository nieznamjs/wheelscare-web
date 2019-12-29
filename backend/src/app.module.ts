import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: AppConfigService) => ({
        type: 'postgres',
        host: configService.database.host,
        port: configService.database.port,
        username: configService.database.username,
        password: configService.database.password,
        database: configService.database.name,
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',
        ],
      } as TypeOrmModuleOptions),
      inject: [AppConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
