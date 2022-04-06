import { Test } from "@nestjs/testing";

import MambuRepositoryMock from '../../test/repositories/mambu.repository.mock';
import { MambuServiceCases } from '../../test/cases/mambu.service.cases';
import { MambuRepository } from "./repositories/mambu.repository";
import { NotEnoughFounds } from "../constants/errors";
import { MambuService } from './mambu.service';

describe("MambuService", ()=>{
  let service: MambuService;

  beforeEach(async ()=>{
    const moduleFixture = await Test.createTestingModule({
      providers: [
        MambuService,
        {
          provide: MambuRepository,
          useClass: MambuRepositoryMock,
        },
      ],
    }).compile();
    const app = moduleFixture.createNestApplication();
    await app.init();
    service = app.get<MambuService>(MambuService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check cashback balance', async ()=>{
    const response = await service.checkCBBalance();
    expect(response).toBeDefined();
    expect(response.balance).toBeDefined();
  });
  for (const index in MambuServiceCases.shouldRechage)
  it('should recharge Cashback Capital Balance -> case '+index, async ()=>{
    const { amount, campain } = MambuServiceCases.shouldRechage[index];
    const balance = await service.rechargeCBCapitalBalance(amount, campain);
    expect(balance).toBeDefined();
    expect(balance.length).toBeDefined();
    expect(balance.length).toBeGreaterThan(0);
    for (const transaction of balance) {
      expect(transaction.notes).toBeDefined();
      expect(transaction.notes).toBe(campain);
    }
  });

  for (const index in MambuServiceCases.shouldRechargeCBWalletBalance)
  it('should recharge Cashback Wallet Balance -> case ' + index, async ()=>{
    const {
      accountCBId,
      amount,
      campain,
      transactionId,
    } = MambuServiceCases.shouldRechargeCBWalletBalance[index];
    try {
      const response = await service.rechargeCBWalletBalance(accountCBId, amount, transactionId, campain);
      expect(response).toBeDefined();
      expect(response.accountCBId).toBeDefined();
      expect(response.accountCBId.length).toBeDefined();
      expect(response.accountCBId.length).toBeGreaterThan(0);
      expect(response.mambuResponse._externalTransactionReferences).toBeDefined();
      expect(response.mambuResponse._externalTransactionReferences.cashbackCampaignName).toBeDefined();
      expect(response.mambuResponse._externalTransactionReferences.cashbackCampaignName).toBe(transactionId);
      expect(response.mambuResponse._externalTransactionReferences.ewalletTransactionID).toBeDefined();
      expect(response.mambuResponse._externalTransactionReferences.ewalletTransactionID).toBe(campain);
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });

  const rechCreateCases = MambuServiceCases.shouldRechargeAndCreateAccount;
  for (const index in rechCreateCases)
  it('should recharge and create account -> case ' + index, async () => {
    try {
      const { accountHolderId, amount, transactionId, campain } = rechCreateCases[index];
      const response = await service.rechargeAndCreateAccount(accountHolderId, amount, transactionId, campain);
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
        expect(mambuR._externalTransactionReferences.cashbackCampaignName).toBe(transactionId);
        expect(mambuR._externalTransactionReferences.ewalletTransactionID).toBeDefined();
        expect(mambuR._externalTransactionReferences.ewalletTransactionID).toBe(campain);
      }
    } catch (err) {
      expect(err).toBeNull();
    }
  });


  // Test Business Fails un service

  for (const index in MambuServiceCases.failRechargeCBWalletBalance)
  it('fail recharge Cashback Wallet Balance -> case ' + index, async ()=>{
    const {
      accountCBId,
      amount,
      campain,
      transactionId,
    } = MambuServiceCases.failRechargeCBWalletBalance[index];
    try {
      const response = await service.rechargeCBWalletBalance(accountCBId, amount, transactionId, campain);
      expect(response).toBeUndefined();
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toBeDefined();
      expect(err.message).toBe(NotEnoughFounds.message);
    }
  });

  const failRCCases = MambuServiceCases.failRechargeAndCreateAccount;
  for (const index in failRCCases)
  it('fail recharge and create account -> case ' + index, async () => {
    try {
      const { accountHolderId, amount, transactionId, campain } = failRCCases[index];
      const response = await service.rechargeAndCreateAccount(accountHolderId, amount, transactionId, campain);
      expect(response).toBeUndefined();
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toBeDefined();
      expect(err.message).toBe(NotEnoughFounds.message);
    }
  });
});
