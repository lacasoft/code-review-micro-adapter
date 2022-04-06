import MambuRepositoryMock from "../repositories/mambu.repository.mock";
import { MambuServiceCases } from "./mambu.service.cases";

const mockRepo = new MambuRepositoryMock();
const accountHolderKeys = [
    "8a6c82ce7f63da7a017f66b5df12006e",
    "8a6c82ce7f63da7a017f6598ff010028",
];

export namespace MambuRepositoryCases {
    export const shouldRecharge = MambuServiceCases.shouldRechage;
    export const shouldRechargeCBWalletBalance = MambuServiceCases.shouldRechargeCBWalletBalance;
    export const shouldCreateCashBackAccount = MambuServiceCases.shouldRechargeAndCreateAccount.
    map((payload, index) => ({
        accountHolderKey: accountHolderKeys[index % accountHolderKeys.length],
        currency: payload.currency,
        //const { currency} = payload;
        //return { currency, accountHolderId };
    }));
    export const shouldCheckAccount = MambuServiceCases.shouldRechargeAndCreateAccount.map(
        (payload) => payload.accountHolderId
    );
    export const shouldCreateCashBackToken = mockRepo.createdAccounts.map((account)=>account.id);
}