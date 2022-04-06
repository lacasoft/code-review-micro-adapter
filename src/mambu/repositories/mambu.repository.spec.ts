import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Test } from "@nestjs/testing";

import { MambuRepositoryCases } from '../../../test/cases/mambu.repository.cases';
import { MambuRepository } from "./mambu.repository";

const walletTypes = ['eWallet', 'cashback'];

describe("MambuRepository", ()=>{
  let repo: MambuRepository;

  beforeEach(async ()=>{
    const moduleFixture = await Test.createTestingModule({
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
      providers: [MambuRepository],
    }).compile();
    const app = moduleFixture.createNestApplication();
    await app.init();
    repo = app.get<MambuRepository>(MambuRepository);
  });
  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should check cashback balance', async ()=>{
      const balance = await repo.checkCBBalance();
      expect(balance).toBeDefined();
      expect(balance.balance).toBeDefined();
  });

  // for (const index in MambuRepositoryCases.shouldRecharge)
  // it('should recharge balance -> case ' + index, async ()=>{
  //     const { amount, campain } = MambuRepositoryCases.shouldRecharge[index];
  //     const balance = await repo.rechargeBalance(amount, campain);
  //     expect(balance).toBeDefined();
  //     expect(balance.length).toBeDefined();
  //     expect(balance.length).toBeGreaterThan(0);
  //     balance.forEach((transaction) => {
  //         expect(transaction.notes).toBeDefined();
  //         expect(transaction.notes).toBe(campain);
  //     });
  // });

  for (const index in MambuRepositoryCases.shouldCheckAccount)
  it('should check accounts -> case ' + index, async ()=>{
    const id = MambuRepositoryCases.shouldCheckAccount[index];

    if (id == 0) {
      return;
    }

    const wallets = await repo.checkAccounts(id);
    expect(wallets).toBeDefined();
    expect(wallets.length).toBeDefined();
    expect(wallets.length).toBeGreaterThan(0);
    for (const wallet of wallets) {
        expect(wallet.id).toBeDefined();
        expect(wallet.id.length).toBeDefined();
        expect(wallet.id.length).toBeGreaterThan(0);
        expect(wallet.name).toBeDefined();
        expect(walletTypes.findIndex((type)=> type==wallet.name)).toBeGreaterThan(-1);
    }
  });

  // for (const index in MambuRepositoryCases.shouldRechargeCBWalletBalance)
  // it('should cashbackWalletBalance -> case ' + index, async ()=>{
  //   const { transactionId, accountCBId, campain, amount} =
  //     MambuRepositoryCases.shouldRechargeCBWalletBalance[index];

  //   const wallet = await repo.cashbackWalletBalance(accountCBId, amount, campain, transactionId);
  //   expect(wallet).toBeDefined();
  //   expect(wallet.id).toBeDefined();
  //   expect(wallet.type).toBeDefined();
  //   expect(wallet.type).toBe('DEPOSIT');
  // });

  // for (const index in MambuRepositoryCases.shouldCreateCashBackAccount)
  // it('should createCashBackAccount & createCashBackToken -> case ' + index, async ()=>{
  //   const { currency, accountHolderKey } = MambuRepositoryCases.shouldCreateCashBackAccount[index];
  //   const account = await repo.createCashBackAccount(accountHolderKey, currency);
  //   expect(account).toBeDefined();
  //   expect(account.id).toBeDefined();
  //   expect(account.id.length).toBeDefined();
  //   expect(account.id.length).toBeGreaterThan(0);

  //   const { id } = account;
  //   let err = null;

  //   try {
  //     await repo.createCashBackToken(id);
  //   } catch (error) {
  //     err = error;
  //   } finally {
  //     expect(err).toBeNull();
  //   }
  // });
});