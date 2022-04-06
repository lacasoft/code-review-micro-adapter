import { RechargeAndCreateAccount } from "../../src/mambu/dto/rechargeAndCreateAccount.dto";
import { RechargeCapitalBalance } from "../../src/mambu/dto/rechargeCapitalBalance.dto";
import { RechargeCashbackWallet } from "../../src/mambu/dto/rechargeCashbackWallet.dto";
import { MambuNetCases } from "./mambo.net.cases";

export namespace MambuControllerCases {
    export const shouldRechage = function(): RechargeCapitalBalance[]  {
        return MambuNetCases.shouldRechage.map((request)=>{
            const tcase = new RechargeCapitalBalance();
            tcase.campain = request.campain;
            tcase.amount = request.amount;
            return tcase;
        });
    }();
    export const shouldRechargeCBWalletBalance = toRechargeCashbackWalletDTO(
        MambuNetCases.shouldRechargeCBWalletBalance
    );
    export const shouldRechargeAndCreateAccount = toRechargeAndCreateAccount(
        MambuNetCases.shouldRechargeAndCreateAccount
    );

    export const failRechargeCBWalletBalance = toRechargeCashbackWalletDTO(
        MambuNetCases.failRechargeCBWalletBalance
    );
    
    export const failRechargeAndCreateAccount = toRechargeAndCreateAccount(
        MambuNetCases.failRechargeAndCreateAccount
    );
}

function toRechargeCashbackWalletDTO(cases): RechargeCashbackWallet[]  {
    return cases.map((request)=>{
        const tcase = new RechargeCashbackWallet();
        tcase.transactionId = request.transaction_id;
        tcase.accountCBId = request.account_cb_id;
        tcase.campain = request.campain;
        tcase.amount = request.amount;
        return tcase;
    });
}
function toRechargeAndCreateAccount(cases): RechargeAndCreateAccount[]  {
    return cases.map((request)=>{
        const tcase = new RechargeAndCreateAccount();
        tcase.accountHolderId = request.account_holder_id;
        tcase.transactionId = request.transaction_id;
        tcase.currency = request.currency;
        tcase.campain = request.campain;
        tcase.amount = request.amount;
        return tcase;
    });
}

