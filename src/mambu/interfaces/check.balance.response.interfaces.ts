export enum TYPES {
    ASSET = "ASSET",
    DEBIT = "DEBIT",
    LIABILITY = "LIABILITY",
    CREDIT = "CREDIT",
}

export interface ICheckBalanceResponse {
    encodedKey: string;
    creationDate: Date;
    lastModifiedDate: Date;
    glCode: string;
    type: TYPES;
    usage: string;
    name: string;
    activated: boolean;
    description: string;
    allowManualJournalEntries: boolean;
    stripTrailingZeros: boolean;
    currency: ICurrency;
    balance: number;
}

interface ICurrency {
    code: string;
    // name: string;
    // symbol: string;
    // digitsAfterDecimal: number;
    // currencySymbolPosition: string;
    // isBaseCurrency: boolean;
    // creationDate: Date;
    // lastModifiedDate: Date;
}