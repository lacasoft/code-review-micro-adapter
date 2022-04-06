import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { AllExceptionsFilter } from './filters/exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger:boolean = Boolean(!process.env.APP_PROD);
  const portTCP = process.env.APP_PORT
    ? Number(process.env.APP_PORT_TCP)
    : 8080;
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 8080;

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug','verbose'],
  });

  const microservice = app.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: portTCP,
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port).then(() => {
    log(`
     ============================================
     =  Microservice execution info:
     =  NAME: ${process.env.APP_NAME}
     =  PORT TCP: ${portTCP}
     =  PORT HTTP: ${port}
     ============================================
     `);
  });
}

bootstrap();
