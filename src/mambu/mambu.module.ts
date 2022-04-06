import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MambuRepository } from './repositories/mambu.repository';
import { MambuController } from './mambu.controller';
import { MambuService } from './mambu.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        timeout: config.get('APP_TIME_OUT'),
        maxRedirects: config.get('APP_MAX_REDIRECTS'),
        baseURL: config.get('MAMBU_API'),
        headers: {
          'Accept' : 'application/vnd.mambu.v2+json',
          'Authorization': 'Basic ' + config.get('MAMBU_BASIC_AUTH')
        },
      }),
    }),
  ],
  providers: [MambuService, MambuRepository],
  controllers: [MambuController],
})
export class MambuModule {}
