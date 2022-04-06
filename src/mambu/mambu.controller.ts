import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { ICheckBalanceResponse } from './interfaces/check.balance.response.interfaces';
import { ICheckAccountResponse } from './interfaces/check.accounts.response.inteface';
import { RechargeAndCreateAccount } from './dto/rechargeAndCreateAccount.dto';
import { RechargeCapitalBalance } from './dto/rechargeCapitalBalance.dto';
import { RechargeCashbackWallet } from './dto/rechargeCashbackWallet.dto';
import { MambuService } from './mambu.service';

@Controller('mambu')
export class MambuController {
    constructor(private readonly mambuService: MambuService){}

    @MessagePattern('check_cb_balance')
    async checkCBBalance(): Promise<ICheckBalanceResponse> {
        try {
            return await this.mambuService.checkCBBalance();
        } catch (error) {
            throw new RpcException(error.message);
        }
    }

    @MessagePattern('recharge_balance_cb_capital')
    async rechargeCBCapitalBalance(@Payload() payload: RechargeCapitalBalance) {
        try {
            const { amount, campain } = payload;
            return await this.mambuService.rechargeCBCapitalBalance(amount, campain);
        } catch (error) {
            throw new RpcException(error.message);
        }
    }

    @MessagePattern('recharge_cb_wallet_balance')
    async rechargeCBWalletBalance(@Payload() payload: RechargeCashbackWallet) {
        try {
            const { accountCBId, amount, transactionId, campain } = payload;
            return await this.mambuService.rechargeCBWalletBalance(accountCBId, amount, transactionId, campain);
        } catch (error) {
            throw new RpcException(error.message);
        }
    }

    @MessagePattern('recharge_and_create_cb_account')
    async rechargeAndCreateAccount(@Payload() payload: RechargeAndCreateAccount) {
        try {
            const { accountHolderId, amount, transactionId, campain } = payload;
            return await this.mambuService.rechargeAndCreateAccount(accountHolderId, amount, transactionId, campain);
        } catch (error) {
            throw new RpcException(error.message);
        }
    }
}