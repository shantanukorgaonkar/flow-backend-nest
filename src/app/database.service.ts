import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const options = {
      type: 'sqlite',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
      logging: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrations: ['dist/db/migrations/*'],
      ssl: {
        rejectUnauthorized: false,
      },
    } as TypeOrmModuleOptions;
    console.log(options);
    return options;
  }
}
