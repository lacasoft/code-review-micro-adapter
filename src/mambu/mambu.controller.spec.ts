import { Test } from "@nestjs/testing";

import { MambuControllerCases } from "../../test/cases/mambu.controller.cases";
import MambuRepositoryMock from "../../test/repositories/mambu.repository.mock";
import { MambuRepository } from "./repositories/mambu.repository";
import { NotEnoughFounds } from "../constants/errors";
import { MambuController } from "./mambu.controller";
import { MambuService } from './mambu.service';

describe("MambuController", ()=>{
  let controller: MambuController;

  beforeEach(async ()=>{
    const moduleFixture = await Test.createTestingModule({
        providers: [
            MambuService,
            {
                provide: MambuRepository,
                useClass: MambuRepositoryMock,
            },
        ],
        controllers: [MambuController,],
    }).compile();
    const app = moduleFixture.createNestApplication();
    await app.init();
    controller = app.get<MambuController>(MambuController);
  });
  it('should be defined', () => {
      expect(controller).toBeDefined();
  });

  it('should check cashback balance', async ()=>{
      const response = await controller.checkCBBalance();
      expect(response).toBeDefined();
      expect(response.balance).toBeDefined();
  });

  for (const index in MambuControllerCases.shouldRechage)
  it('should recharge Cashback Capital Balance -> case '+index, async ()=>{
      const payload = MambuControllerCases.shouldRechage[index];
      const balance = await controller.rechargeCBCapitalBalance(payload);

      expect(balance).toBeDefined();
      expect(balance.length).toBeDefined();
      expect(balance.length).toBeGreaterThan(0);
      for (const transaction of balance) {
          expect(transaction.notes).toBeDefined();
          expect(transaction.notes).toBe(payload.campain);
      };
  });

  for (const index in MambuControllerCases.shouldRechargeCBWalletBalance)
  it('should recharge Cashback Wallet Balance -> case '+index, async ()=>{
      const payload = MambuControllerCases.shouldRechargeCBWalletBalance[index];
      const { transactionId, campain } = payload;
      const response = await controller.rechargeCBWalletBalance(payload);
      expect(response.accountCBId).toBeDefined();
      expect(response.accountCBId.length).toBeDefined();
      expect(response.accountCBId.length).toBeGreaterThan(0);
      expect(response.mambuResponse._externalTransactionReferences).toBeDefined();
      expect(response.mambuResponse._externalTransactionReferences.cashbackCampaignName).toBeDefined();
      expect(response.mambuResponse._externalTransactionReferences.cashbackCampaignName).toBe(transactionId);
      expect(response.mambuResponse._externalTransactionReferences.ewalletTransactionID).toBeDefined();
      expect(response.mambuResponse._externalTransactionReferences.ewalletTransactionID).toBe(campain);
  });

  for (const index in MambuControllerCases.shouldRechargeAndCreateAccount)
  it('should recharge and create account -> case ' + index, async ()=>{
      const request = MambuControllerCases.shouldRechargeAndCreateAccount[index];
      const { transactionId, campain } = request;
      let error = null;
      try {
        const response = await controller.rechargeAndCreateAccount(request);
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
          error = err;
      } finally {
          expect(error).toBeNull();
      }
  });


    
  // Test Business Fails in service
  for (const index in MambuControllerCases.failRechargeCBWalletBalance)
  it('fail recharge Cashback Wallet Balance -> case ' + index, async ()=>{
    const payload = MambuControllerCases.failRechargeCBWalletBalance[index];
    try {
      const response = await controller.rechargeCBWalletBalance(payload);
      expect(response).toBeUndefined();
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toBeDefined();
      expect(err.message).toBe(NotEnoughFounds.message);
    }
  });

  const failRCCases = MambuControllerCases.failRechargeAndCreateAccount;
  for (const index in failRCCases)
  it('fail recharge and create account -> case ' + index, async () => {
    try {
      const payload = failRCCases[index];
      const response = await controller.rechargeAndCreateAccount(payload);
      expect(response).toBeUndefined();
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toBeDefined();
      expect(err.message).toBe(NotEnoughFounds.message);
    }
  });
});