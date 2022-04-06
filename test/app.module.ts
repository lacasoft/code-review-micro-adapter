import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { MambuRepository } from '../src/mambu/repositories/mambu.repository';
import { MambuController } from '../src/mambu/mambu.controller';
import { MambuService } from '../src/mambu/mambu.service';

import MambuRepositoryMock from './repositories/mambu.repository.mock';


@Module({
  imports: [
    ClientsModule.register([
      { name: 'MAMBU_SERVICE', transport: Transport.TCP },
    ]),
  ],
  providers: [
    {
      provide: MambuRepository,
      useClass: MambuRepositoryMock,
    },
    /*{
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },*/
    MambuService,
  ],
  controllers: [MambuController],
})
export class MambuModuleMock {
}

export async function getModule() {
  return await Test.createTestingModule({
    imports: [MambuModuleMock],
  }).compile();
}

export async function getMockApp() {
  return (await getModule()).createNestApplication();
}
