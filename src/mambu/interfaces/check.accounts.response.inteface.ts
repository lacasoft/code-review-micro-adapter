export declare enum HOLDERTYPES {
    CLIENT = "CLIENT"
}

export declare enum ACCOUNTSTATE {
    ACTIVE = "ACTIVE"
}

export declare enum ACCOUNTTYPES {
    CURRENTACCOUNT = "CURRENT_ACCOUNT"
}

export declare enum CURRENCIES {
    MXN = "MXN"
}

export interface ICheckAccountResponse {
    accounts: IAccount[];
}

export interface IAccount {
    encodedKey: string;
    creationDate: Date;
    lastModifiedDate: Date;
    id: number;
    name: string;
    accountHolderType: HOLDERTYPES;
    accountHolderKey: number;
    accountState: ACCOUNTSTATE;
    productTypeKey: number;
    accountType: ACCOUNTTYPES;
    approvedDate: Date;
    activationDate: Date;
    currencyCode: CURRENCIES;
    internalControls: IInternalControls;
    overdraftSettings: IOverdraftSettings;
    interestSettings: IInterestSettings;
    overdraftInterestSettings: IOverdraftInterestSettings;
    balances: IBalances;
    accruedAmounts: IAccruedAmounts;
}

interface IInternalControls {}

interface IOverdraftSettings {
    allowOverdraft: boolean;
    overdraftLimit: number;
}

interface IInterestSettings {
    interestPaymentSettings: IInterestPaymentSettings;
}

interface IInterestPaymentSettings {
    interestPaymentDates: IInterestPaymentDates[];
}

interface IInterestPaymentDates{}

interface IOverdraftInterestSettings{}

interface IBalances {
    totalBalance: number;
    overdraftAmount: number;
    technicalOverdraftAmount: number;
    lockedBalance: number;
    availableBalance: number;
    holdBalance: number;
    overdraftInterestDue: number;
    technicalOverdraftInterestDue: number;
    feesDue: number;
    blockedBalance: number;
    forwardAvailableBalance: number;
}

interface IAccruedAmounts {
    interestAccrued: number;
    overdraftInterestAccrued: number;
    technicalOverdraftInterestAccrued: number;
    negativeInterestAccrued: number;
}

/*
    "encodedKey": "8a6c82ce7f63da7a017f659ce997003a",
    "creationDate": "2022-03-07T12:25:51-06:00",
    "lastModifiedDate": "2022-03-07T12:36:57-06:00",
    "id": "FI5129242836",
    "name": "cashback",
    "accountHolderType": "CLIENT",
    "accountHolderKey": "8a6c82ce7f63da7a017f6598ff010028",
    "accountState": "ACTIVE",
    "productTypeKey": "8a6ca2c37d764b15017d7658e15c0003",
    "accountType": "CURRENT_ACCOUNT",
    "approvedDate": "2022-03-07T12:25:51-06:00",
    "activationDate": "2022-03-07T12:36:57-06:00",
    "currencyCode": "MXN",
    "internalControls": {},
    "overdraftSettings": {
        "allowOverdraft": false,
        "overdraftLimit": 0
    },
    "interestSettings": {
        "interestPaymentSettings": {
            "interestPaymentDates": []
        }
    },
    "overdraftInterestSettings": {},
    "balances": {
        "totalBalance": 10.1000000000,
        "overdraftAmount": 0,
        "technicalOverdraftAmount": 0,
        "lockedBalance": 0,
        "availableBalance": 10.1000000000,
        "holdBalance": 0,
        "overdraftInterestDue": 0,
        "technicalOverdraftInterestDue": 0,
        "feesDue": 0,
        "blockedBalance": 0,
        "forwardAvailableBalance": 0
    },
    ".": {
        "interestAccrued": 0,
        "overdraftInterestAccrued": 0,
        "technicalOverdraftInterestAccrued": 0,
        "negativeInterestAccrued": 0
    }
}
*/