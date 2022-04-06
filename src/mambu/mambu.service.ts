import { Injectable } from '@nestjs/common';

import { ICheckBalanceResponse } from './interfaces/check.balance.response.interfaces';
//import { ICheckAccountResponse } from './interfaces/check.accounts.response.inteface';
import { ITopUpCapitalItem } from './interfaces/recharge.response.interface';
import { ResponseWalletCreated } from './dto/responseWalletCreated.dto';
import { MambuRepository } from './repositories/mambu.repository';
import { NotEnoughFounds } from '../constants/errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MambuService {
    constructor(private mambuRepo: MambuRepository, private configService: ConfigService,) {}
    
    checkCBBalance(): Promise<ICheckBalanceResponse> {
        return this.mambuRepo.checkCBBalance();
    }

    rechargeCBCapitalBalance(amount: number, campain: string): Promise<ITopUpCapitalItem[]> {
        return this.mambuRepo.rechargeBalance(amount, 
            campain, 
            this.configService.get('MAMBU_SERVICE_PAYABLE'),
            this.configService.get('MAMBU_CASH_BACK_FOUNDS'));
    }

    async rechargeCBWalletBalance(accountCBId: string, amount: number, transactionId: string , campain: string) {
        const { balance } = await this.mambuRepo.checkCBBalance();

        if (balance < amount) {
            throw new Error(NotEnoughFounds.message);
        }

        return this.netCBLiabilitiesBalance(accountCBId, amount, transactionId, campain);
    }

    async rechargeAndCreateAccount(accountHolderId: number, amount: number, transactionId: string, campain: string) {
        const { balance } = await this.mambuRepo.checkCBBalance();

        if (balance < amount) {
            throw new Error(NotEnoughFounds.message);
        }

        return await this.checkAccounts(accountHolderId, amount, transactionId, campain);
    }

    private async checkAccounts(accountHolderId: number, amount: number, transactionId: string, campain: string) {
        const accounts = await this.mambuRepo.checkAccounts(accountHolderId);
        let hasCashbackAccount: boolean = false;
        let cashbackAccount: any;

        // Search cashback account
        const canSearch = (typeof accounts == 'object' && 'length' in accounts && accounts.length > 0);
        if (canSearch) {
            let isCBAccount:boolean;
            for (const account of accounts) {
                isCBAccount = account.name === 'cashback'
                if (account.name === 'cashback') {
                    cashbackAccount = account;
                    hasCashbackAccount = true;
                    break;
                }
            }
        }

        if (hasCashbackAccount)
            return await this.netCBLiabilitiesBalance(cashbackAccount.id, amount, transactionId, campain)
        else { // Create Cashback account
            const newAccount = await this.createCashBackAccount(accounts[0].accountHolderKey, accounts[0].currencyCode, amount, transactionId, campain);
            const response = new ResponseWalletCreated();
            response.accountHolderKey = newAccount.mambuResponse.accountHolderKey;
            response.currency = newAccount.mambuResponse.currency;
            response.id = newAccount.accountCBId;
            return response;
        }
    }

    private async createCashBackAccount(accountHolderKey: string, currency: string, amount: number, transactionId: string, campain: string) {
        const data = await this.mambuRepo.createCashBackAccount(accountHolderKey, currency);

        const cantRechargeWallet = (typeof data == 'undefined' || data==null);
        if (cantRechargeWallet) {
            throw new Error("cant recharge balance");
        }

        await this.mambuRepo.createCashBackToken(data.id);
        return await this.netCBLiabilitiesBalance(data.id, amount, transactionId, campain)
    }

    private async netCBLiabilitiesBalance(accountCBId: string, amount: number, transactionId: string, campain: string) {
        const data = await this.mambuRepo.rechargeBalance(amount, 
            campain,
            this.configService.get('MAMBU_CASH_BACK_FOUNDS'),
            this.configService.get('MAMBU_SERVICE_PAYABLE'));
        const cantRechargeWallet = (typeof data == 'undefined' || data==null);

        if (cantRechargeWallet) {
            throw new Error("cant recharge balance");
        }

        const mambuResponse = await this.mambuRepo.cashbackWalletBalance(accountCBId, amount, transactionId, campain);
        return {
            accountCBId,
            mambuResponse
        };
    }
}
