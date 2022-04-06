import { MambuControllerCases } from "./mambu.controller.cases";

export namespace MambuServiceCases {
    // -> rechargeCBCapitalBalance
    export const shouldRechage = MambuControllerCases.shouldRechage;

    // -> rechargeCBWalletBalance
    export const shouldRechargeCBWalletBalance = MambuControllerCases.shouldRechargeCBWalletBalance;

    // -> rechargeAndCreateAccount
    export const shouldRechargeAndCreateAccount = MambuControllerCases.shouldRechargeAndCreateAccount;

    // privates
    // -> checkAccounts
    export const shouldCheckAccounts = MambuControllerCases.shouldRechargeAndCreateAccount;

    // -> createCashBackAccount
    export const shouldCreateCashBackAccount = MambuControllerCases.shouldRechargeAndCreateAccount
        .map((createAccountPayload) => {
            return {
                transactionId: createAccountPayload.transactionId,
                campain: createAccountPayload.campain,
                accountId: 'accountID1',
                amount: 5,
            };
        });

    // -> netCBLiabilitiesBalance
    export const shouldNetCBLiabilitiesBalance = MambuControllerCases.shouldRechargeCBWalletBalance;

    export const failRechargeCBWalletBalance = MambuControllerCases.failRechargeCBWalletBalance;
    export const failRechargeAndCreateAccount = MambuControllerCases.failRechargeAndCreateAccount;
}