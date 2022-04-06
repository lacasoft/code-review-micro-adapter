import { validationSchema } from './utils/environment.validations';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MambuModule } from './mambu/mambu.module';
import { RMQLoggerService } from '@sihay.ztch/logger-cb';
import { HealthIndicator } from './health/health';
import { AppController } from './app.controller';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema,
    }),
    MambuModule,
  ],
  providers: [
    HealthIndicator,
    RMQLoggerService,
    {
      provide: 'RMQ_LOGGER',
      useExisting: RMQLoggerService,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
