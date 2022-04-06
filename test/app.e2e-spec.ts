import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ClientProxy, Transport } from '@nestjs/microservices';

import { NotEnoughFounds } from '../src/constants/errors';
import { MambuNetCases } from './cases/mambo.net.cases';
import { getMockApp } from './app.module';


describe('App (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    app = await getMockApp();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.connectMicroservice(
      {
        transport: Transport.TCP,
      },
      {
        inheritAppConfig: true,
      },
    );

    await app.startAllMicroservices();
    await app.init();

    client = app.get('MAMBU_SERVICE');
    await client.connect();
  });
  afterAll(async () => {
    await app.close();
    client.close();
  });
  it('should be defined', ()=>{
    expect(app).toBeDefined();
    expect(client).toBeDefined();
  });
  
  it('check_cb_balance -> OK', (done) => {
    client.send('check_cb_balance', {}).subscribe({
      next: (response) => {
        expect(response).toBeDefined();
        expect(response.type).toBeDefined();
        expect(response.type).toBe('ASSET');
        expect(response.activated).toBeDefined();
        expect(response.activated).toBeTruthy();
        done();
      },
      error: (error) => {
        expect(error).toBeNull();
        done();
      },
    });
  });
  for(const index in MambuNetCases.shouldRechage)
  it('recharge_balance_cb_capital -> OK ' + index, (done) => {
    const tcase = MambuNetCases.shouldRechage[index];
    client.send('recharge_balance_cb_capital', tcase).subscribe({
      next: (response) => {
        expect(response).toBeDefined();
        expect(response.length).toBeDefined();
        expect(response.length).toBeGreaterThan(0);
        done();
      },
      error: (error) => {
        expect(error).toBeNull();
        done();
      },
    });
  });
  for (const index in MambuNetCases.shouldRechargeCBWalletBalance)
  it('recharge_cb_wallet_balance -> OK '+index, (done)=>{
    const tcase = MambuNetCases.shouldRechargeCBWalletBalance[index];
    const { transaction_id, campain } = tcase;
    client.send('recharge_cb_wallet_balance', tcase).subscribe({
      next: (response) => {
        expect(response).toBeDefined();
        expect(response.accountCBId).toBeDefined();
        expect(response.accountCBId.length).toBeDefined();
        expect(response.accountCBId.length).toBeGreaterThan(0);
        expect(response.mambuResponse._externalTransactionReferences).toBeDefined();
        expect(response.mambuResponse._externalTransactionReferences.cashbackCampaignName).toBeDefined();
        expect(response.mambuResponse._externalTransactionReferences.cashbackCampaignName).toBe(transaction_id);
        expect(response.mambuResponse._externalTransactionReferences.ewalletTransactionID).toBeDefined();
        expect(response.mambuResponse._externalTransactionReferences.ewalletTransactionID).toBe(campain);
        done();
      },
      error: (error) => {
        expect(error).toBeNull();
        done();
      },
    });
  });
  for (const index in MambuNetCases.shouldRechargeAndCreateAccount)
  it('recharge_and_create_cb_account -> OK '+index, (done)=>{
    const tcase = MambuNetCases.shouldRechargeAndCreateAccount[index];
    const { transaction_id, campain } = tcase;
    client.send('recharge_and_create_cb_account', tcase).subscribe({
      next: (response) => {
        expect(response).toBeDefined();

        if ('id' in response) {
          expect(response.id).toBeDefined();
          expect(response.id.length).toBeDefined();
          expect(response.id.length).toBeGreaterThan(0);
        } else {
          expect(response.accountCBId).toBeDefined();
          expect(response.accountCBId.length).toBeDefined();
          expect(response.accountCBId.length).toBeGreaterThan(0);
        }

        let mambuR;
  
        if ('mambuResponse' in response) {
          mambuR = response.mambuResponse;
        } else {
          mambuR = response;
        }

        if ('_externalTransactionReferences' in mambuR) {
          expect(mambuR._externalTransactionReferences).toBeDefined();
          expect(mambuR._externalTransactionReferences.cashbackCampaignName).toBeDefined();
          expect(mambuR._externalTransactionReferences.cashbackCampaignName).toBe(transaction_id);
          expect(mambuR._externalTransactionReferences.ewalletTransactionID).toBeDefined();
          expect(mambuR._externalTransactionReferences.ewalletTransactionID).toBe(campain);
        }
        done();
      },
      error: (error) => {
        expect(error).toBeNull();
        done();
      },
    });
  });

  // Test Business Fails
  for (const index in MambuNetCases.failRechargeCBWalletBalance)
  it('recharge_cb_wallet_balance -> FAIL '+index, (done)=>{
    const tcase = MambuNetCases.failRechargeCBWalletBalance[index];
    client.send('recharge_cb_wallet_balance', tcase).subscribe({
      next: (response) => {
        expect(response).toBeUndefined();
        done();
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toBeDefined();
        expect(error.message).toBe(NotEnoughFounds.message);
        done();
      },
    });
  }); 
  for (const index in MambuNetCases.failRechargeAndCreateAccount)
  it('recharge_and_create_cb_account -> FAIL '+index, (done)=>{
    const tcase = MambuNetCases.failRechargeAndCreateAccount[index];
    client.send('recharge_and_create_cb_account', tcase).subscribe({
      next: (response) => {
        expect(response).toBeUndefined();
        done();
      },
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toBeDefined();
        expect(error.message).toBe(NotEnoughFounds.message);
        done();
      },
    });
  });
});