import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

import { ICheckBalanceResponse } from '../interfaces/check.balance.response.interfaces';
import { ITopUpCapitalItem } from '../interfaces/recharge.response.interface';
import { createDateTimeFormated } from '../../utils/time';
import { endpoints } from '../../constants/endpoints';

@Injectable()
export class MambuRepository {
    constructor(
        private httpClient: HttpService,
        private configService: ConfigService,
    ) {}

    checkCBBalance(): Promise<ICheckBalanceResponse> {
        const url = endpoints.checkAssetAccountBalance(
            this.configService.get('MAMBU_CASH_BACK_FOUNDS')
        );
        const response = this.httpClient
            .get(url)
            .pipe(map((res) => res.data));
        return lastValueFrom(response);
    }

    rechargeBalance(amount: number, campain: string, credit: number, debit: number): Promise<ITopUpCapitalItem[]> {
        const url = endpoints.rechargeBalance();
        const newRecharge = this.newRechargePayload(
            this.configService.get('MAMBU_SERVICE_PAYABLE'),
            this.configService.get('MAMBU_CASH_BACK_FOUNDS'),
            amount,
            campain,
        );
        const response = this.httpClient
            .post(url, newRecharge)
            .pipe(map((res) => res.data));
        return  lastValueFrom(response);
    }

    checkAccounts(accountHolderId: number) {
        const url = endpoints.checkAccounts(accountHolderId);
        const response = this.httpClient
            .get(url)
            .pipe(map((res) => res.data));
        return lastValueFrom(response);
    }

    cashbackWalletBalance(accountCBId: string, amount: number, transactionId: string, campain: string) {
        const url = endpoints.rechargeCBWalletBalance(accountCBId);
        const newRecharge = this.newNetCBWalletPayload(amount, transactionId, campain);
        const response = this.httpClient
            .post(url, newRecharge)
            .pipe(map((res) => res.data));
        return lastValueFrom(response);
    }

    createCashBackAccount(accountHolderKey: string, currency: string) {
        const url = endpoints.createCashBackAccount();
        const newCBAccount = this.newAccountPayload(accountHolderKey, currency);
        const response = this.httpClient
            .post(url, newCBAccount)
            .pipe(map((res) => res.data));
        return lastValueFrom(response);
    }

    createCashBackToken(accountId: string){
        const url = endpoints.createCashBackToken(accountId);
        const newCBAccount = this.newTokenPayload(accountId);

        const response = this.httpClient
            .post(url, newCBAccount)
            .pipe(map((res) => res.data));
        return lastValueFrom(response);
    }

    // Payloads
    newRechargePayload(creditId: number, debitId: number, amount: number, notes: string) {
        const date = createDateTimeFormated(
            this.configService.get('APP_TIME_HOURS_LESS'),
            this.configService.get('APP_TIME_HOURS')
        );
        const newRechargeBalance = {
            "credits": [
              {
                "amount": amount,
                "glAccount": creditId //121007
              }
            ],
            "date": date,
            "debits": [
              {
                "amount": amount,
                "glAccount": debitId //210003
              }
            ],
            "notes": notes
        }

        return newRechargeBalance;
    }
    newNetCBWalletPayload(amount: number, transactionId: string, campain: string) {
        const newWalletBalance = {
            "transactionDetails": {
                "transactionChannelId": "ewallet_cashin_cashback"
            },
            "amount": amount,
            "_externalTransactionReferences": {
                "ewalletTransactionID": transactionId,
                "cashbackCampaignName": campain
            }
        }

        return newWalletBalance;
    }
    newTokenPayload(accountId: string) {
        const newToken = {
            "referenceToken": accountId
        }
        
        return newToken;
    }
    newAccountPayload(accountHolderKey: string, currency: string) {
        const newCBAccount = {
            "accountType": this.configService.get('MAMBU_ACCOUNT_TYPE'),
            "productTypeKey": this.configService.get('MAMBU_PRODUCT_TYPE_KEY'),
            "accountHolderType": this.configService.get('MAMBU_ACCOUNT_HOLDER_TYPE'),
            "accountHolderKey": accountHolderKey,
            "id": "",
            "accountState": "APPROVED",
            "currencyCode": currency,
            "name": this.configService.get('MAMBU_ACCOUNT_CB_NAME'),
          }
        
       return newCBAccount;
    }
}