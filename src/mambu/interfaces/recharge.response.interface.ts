export declare enum TYPES {
    ASSET = "ASSET",
    DEBIT = "DEBIT",
    LIABILITY = "LIABILITY",
    CREDIT = "CREDIT",
}

export interface ITopUpCapitalResponse {
    rechargeItem: ITopUpCapitalItem[];
}

export interface ITopUpCapitalItem {
    encodedKey: string;
    entryID: number;
    creationDate: Date;
    bookingDate: Date;
    transactionId: string;
    amount: number;
    glAccount: IGlAccount;
    type: TYPES;
    userKey: string;
    notes: string;
}

interface IGlAccount {
    encodedKey: string;
    creationDate: Date;
    lastModifiedDate: Date;
    glCode: number;
    type: TYPES;
    usage: string;
    name: string;
    activated: boolean;
    description: string;
    allowManualJournalEntries: boolean;
    stripTrailingZeros: boolean;
    currency: ICurrency;
} 

interface ICurrency {
    // currency: string
    code: string;
}

/*
[
{
    "encodedKey": "8a6c88617f4af59f017f56d964420234",
    "entryID": 5720,
    "creationDate": "2022-03-04T17:17:47-06:00",
    "bookingDate": "2022-03-04T07:35:07-06:00",
    "transactionId": "259ZAG08IK063",
    "amount": 10000,
    "glAccount": {
        "encodedKey": "8a6c0e137acf01bf017acf0f2d7e000a",
        "creationDate": "2021-07-22T11:31:56-05:00",
        "lastModifiedDate": "2021-12-09T14:41:37-06:00",
        "glCode": "121007",
        "type": "ASSET",
        "usage": "DETAIL",
        "name": "Cashback Funds",
        "activated": true,
        "description": "This GL Account reflects the amount available for cashback campaign.",
        "allowManualJournalEntries": true,
        "stripTrailingZeros": true,
        "currency": {
            "code": "MXN"
        }
    },
    "type": "DEBIT",
    "userKey": "8a6c0e137acf01bf017aeeb1db3b00d2",
    "notes": "Citibank deposit identification"
},
{
    "encodedKey": "8a6c88617f4af59f017f57399b200235",
    "entryID": 5721,
    "creationDate": "2022-03-04T17:17:47-06:00",
    "bookingDate": "2022-03-04T07:35:07-06:00",
    "transactionId": "259ZAG08IK063",
    "amount": 10000,
    "glAccount": {
        "encodedKey": "8a6c071b7b5970f8017b5a3a22e30004",
        "creationDate": "2021-08-18T12:09:59-05:00",
        "lastModifiedDate": "2021-08-18T12:09:59-05:00",
        "glCode": "210002",
        "type": "LIABILITY",
        "usage": "DETAIL",
        "name": "Service Payable",
        "activated": true,
        "description": "This account keeps the amount payable to services and commissions.",
        "allowManualJournalEntries": true,
        "stripTrailingZeros": true,
        "currency": {
            "code": "MXN"
        }
    },
    "type": "CREDIT",
    "userKey": "8a6c0e137acf01bf017aeeb1db3b00d2",
    "notes": "Citibank deposit identification"
}
]
*/
  