import { ICheckBalanceResponse, TYPES } from "../../src/mambu/interfaces/check.balance.response.interfaces";
import { ITopUpCapitalItem } from "../../src/mambu/interfaces/recharge.response.interface";

export default class MambuRepositoryMock {
  async checkCBBalance(): Promise<ICheckBalanceResponse> {
    return {
      encodedKey: '8a6c0e137acf01bf017acf0f2d7e000a',
      creationDate: new Date('2021-07-22T11:31:56-05:00'),
      lastModifiedDate: new Date('2021-12-09T14:41:37-06:00'),
      glCode: '121007',
      type: TYPES.ASSET,
      usage: 'DETAIL',
      name: 'Cashback Funds',
      activated: true,
      description: 'This GL Account reflects the amount available for cashback campaign.',
      allowManualJournalEntries: true,
      stripTrailingZeros: true,
      currency: { code: 'MXN' },
      balance: 1089966.9
    };
  }

  async checkAccounts(accountHolderId: number) {
    return accountHolderId == 0 ?
    [
      {
        encodedKey: '8a6ca4647f8cc8ac017f8e7c5db50050',
        creationDate: new Date('2022-03-15T10:49:49-06:00'),
        lastModifiedDate: new Date('2022-03-15T10:49:49-06:00'),
        id: 'EH9741771283',
        name: 'no-cashback',
        accountHolderType: 'CLIENT',
        accountHolderKey: '8a6c82ce7f63da7a017f66b5df12006e',
        accountState: 'APPROVED',
        productTypeKey: '8a6ca2c37d764b15017d7658e15c0003',
        accountType: 'CURRENT_ACCOUNT',
        approvedDate: new Date('2022-03-15T10:49:49-06:00'),
        currencyCode: 'MXN',
        internalControls: {},
        overdraftSettings: { allowOverdraft: false, overdraftLimit: 0 },
        interestSettings: { interestPaymentSettings: [Object] },
        overdraftInterestSettings: {},
        balances: {
          totalBalance: 0,
          overdraftAmount: 0,
          technicalOverdraftAmount: 0,
          lockedBalance: 0,
          availableBalance: 0,
          holdBalance: 0,
          overdraftInterestDue: 0,
          technicalOverdraftInterestDue: 0,
          feesDue: 0,
          blockedBalance: 0,
          forwardAvailableBalance: 0
        },
        accruedAmounts: {
          interestAccrued: 0,
          overdraftInterestAccrued: 0,
          technicalOverdraftInterestAccrued: 0,
          negativeInterestAccrued: 0
        }
      },
    ] : [
      {
        encodedKey: '8a6ca4647f8cc8ac017f8e7c5db50050',
        creationDate: new Date('2022-03-15T10:49:49-06:00'),
        lastModifiedDate: new Date('2022-03-15T10:49:49-06:00'),
        id: 'EH9741771283',
        name: 'cashback',
        accountHolderType: 'CLIENT',
        accountHolderKey: '8a6c82ce7f63da7a017f66b5df12006e',
        accountState: 'APPROVED',
        productTypeKey: '8a6ca2c37d764b15017d7658e15c0003',
        accountType: 'CURRENT_ACCOUNT',
        approvedDate: new Date('2022-03-15T10:49:49-06:00'),
        currencyCode: 'MXN',
        internalControls: {},
        overdraftSettings: { allowOverdraft: false, overdraftLimit: 0 },
        interestSettings: { interestPaymentSettings: [Object] },
        overdraftInterestSettings: {},
        balances: {
          totalBalance: 0,
          overdraftAmount: 0,
          technicalOverdraftAmount: 0,
          lockedBalance: 0,
          availableBalance: 0,
          holdBalance: 0,
          overdraftInterestDue: 0,
          technicalOverdraftInterestDue: 0,
          feesDue: 0,
          blockedBalance: 0,
          forwardAvailableBalance: 0
        },
        accruedAmounts: {
          interestAccrued: 0,
          overdraftInterestAccrued: 0,
          technicalOverdraftInterestAccrued: 0,
          negativeInterestAccrued: 0
        }
      },
      {
        encodedKey: '8a6c8c8c7f8ccfd6017f8e7c54e9006b',
        creationDate: new Date('2022-03-15T10:49:50-06:00'),
        lastModifiedDate: new Date('2022-03-15T10:49:50-06:00'),
        id: 'RB7661245101',
        name: 'cashback',
        accountHolderType: 'CLIENT',
        accountHolderKey: '8a6c82ce7f63da7a017f66b5df12006e',
        accountState: 'APPROVED',
        productTypeKey: '8a6ca2c37d764b15017d7658e15c0003',
        accountType: 'CURRENT_ACCOUNT',
        approvedDate: new Date('2022-03-15T10:49:51-06:00'),
        currencyCode: 'MXN',
        internalControls: {},
        overdraftSettings: { allowOverdraft: false, overdraftLimit: 0 },
        interestSettings: { interestPaymentSettings: [Object] },
        overdraftInterestSettings: {},
        balances: {
          totalBalance: 0,
          overdraftAmount: 0,
          technicalOverdraftAmount: 0,
          lockedBalance: 0,
          availableBalance: 0,
          holdBalance: 0,
          overdraftInterestDue: 0,
          technicalOverdraftInterestDue: 0,
          feesDue: 0,
          blockedBalance: 0,
          forwardAvailableBalance: 0
        },
        accruedAmounts: {
          interestAccrued: 0,
          overdraftInterestAccrued: 0,
          technicalOverdraftInterestAccrued: 0,
          negativeInterestAccrued: 0
        }
      }
    ];
  }

  async rechargeBalance(): Promise<ITopUpCapitalItem[]> {
    return [
      {
        encodedKey: '8a6c82ce7f63da7a017f7acde1c204df',
        entryID: 6278,
        creationDate: new Date('2022-03-11T15:23:18-06:00'),
        bookingDate: new Date('2022-03-11T15:23:18-06:00'),
        transactionId: '218CPX27YO541',
        amount: 100000,
        glAccount: {
          encodedKey: '8a6c0e137acf01bf017acf0f2d7e000a',
          creationDate: new Date('2021-07-22T11:31:56-05:00'),
          lastModifiedDate: new Date('2021-12-09T14:41:37-06:00'),
          glCode: 121007,
          type: TYPES.ASSET,
          usage: 'DETAIL',
          name: 'Cashback Funds',
          activated: true,
          description: 'This GL Account reflects the amount available for cashback campaign.',
          allowManualJournalEntries: true,
          stripTrailingZeros: true,
          currency: { code: 'MXN' },
        },
        type: TYPES.DEBIT,
        userKey: '8a6c0e137acf01bf017aeeb1db3b00d2',
        notes: 'Campaña demo test'
      },
      {
        encodedKey: '8a6c82ce7f63da7a017f7acde1c204e0',
        entryID: 6279,
        creationDate: new Date('2022-03-11T15:23:18-06:00'),
        bookingDate: new Date('2022-03-11T15:23:18-06:00'),
        transactionId: '218CPX27YO541',
        amount: 100000,
        glAccount: {
          encodedKey: '8a6c071b7b5970f8017b5a3a22e30004',
          creationDate: new Date('2021-08-18T12:09:59-05:00'),
          lastModifiedDate: new Date('2021-08-18T12:09:59-05:00'),
          glCode: 210002,
          type: TYPES.LIABILITY,
          usage: 'DETAIL',
          name: 'Service Payable',
          activated: true,
          description: 'This account keeps the amount payable to services and commissions.',
          allowManualJournalEntries: true,
          stripTrailingZeros: true,
          currency: { code: 'MXN' },
        },
        type: TYPES.CREDIT,
        userKey: '8a6c0e137acf01bf017aeeb1db3b00d2',
        notes: 'Campaña demo test'
      }
    ]
  }
  async createCashBackAccount(accountHolderKey, currency): Promise<any> {
    return this.createdAccounts.find((account)=>account.accountHolderKey === accountHolderKey)
  };


  async cashbackWalletBalance(accountCBId: string, amount: number, transactionId: string, campain: string) {
    return {
      encodedKey: '8a6c8c8c7f8ccfd6017f8e6997620052',
      id: '3417',
      creationDate: new Date('2022-03-15T10:34:58-06:00'),
      valueDate: new Date('2022-03-15T10:34:58-06:00'),
      bookingDate: new Date('2022-03-15T10:34:58-06:00'),
      parentAccountKey: '8a6c82ce7f63da7a017f659ce997003a',
      type: 'DEPOSIT',
      amount: 1,
      currencyCode: 'MXN',
      affectedAmounts: {
        fundsAmount: 1,
        interestAmount: 0,
        feesAmount: 0,
        overdraftAmount: 0,
        overdraftFeesAmount: 0,
        overdraftInterestAmount: 0,
        technicalOverdraftAmount: 0,
        technicalOverdraftInterestAmount: 0,
        fractionAmount: 0
      },
      taxes: {},
      accountBalances: { totalBalance: 65.3 },
      userKey: '8a6c0e137acf01bf017aeeb1db3b00d2',
      terms: {
        interestSettings: {},
        overdraftInterestSettings: {},
        overdraftSettings: {}
      },
      transactionDetails: {
        transactionChannelKey: '8a6c87217d90115c017d901fe8eb0003',
        transactionChannelId: 'ewallet_cashin_cashback'
      },
      transferDetails: {},
      fees: [],
      _externalTransactionReferences: {
        cashbackCampaignName: '06367c0e-d6f7-4633-933a-f7e718fae8a5',
        ewalletTransactionID: 'Campaña test'
      }
    }
  }

  async createCashBackToken(accountId: string) {
    return null;
  }


  createdAccounts = [
    {
      encodedKey: '8a6c82ce7f63da7a017f8a0d2fd905f7',
      creationDate: '2022-03-14T15:28:43-06:00',
      lastModifiedDate: '2022-03-14T15:28:43-06:00',
      id: 'TH7618451495',
      name: 'cashback',
      accountHolderType: 'CLIENT',
      accountHolderKey: '8a6c82ce7f63da7a017f66b5df12006e',
      accountState: 'APPROVED',
      productTypeKey: '8a6ca2c37d764b15017d7658e15c0003',
      accountType: 'CURRENT_ACCOUNT',
      approvedDate: '2022-03-14T15:28:43-06:00',
      currencyCode: 'MXN',
      internalControls: {},
      overdraftSettings: { allowOverdraft: false, overdraftLimit: 0 },
      interestSettings: { interestPaymentSettings: { interestPaymentDates: [] } },
      overdraftInterestSettings: {},
      balances: {
        totalBalance: 0,
        overdraftAmount: 0,
        technicalOverdraftAmount: 0,
        lockedBalance: 0,
        availableBalance: 0,
        holdBalance: 0,
        overdraftInterestDue: 0,
        technicalOverdraftInterestDue: 0,
        feesDue: 0,
        blockedBalance: 0,
        forwardAvailableBalance: 0
      },
      accruedAmounts: {
        interestAccrued: 0,
        overdraftInterestAccrued: 0,
        technicalOverdraftInterestAccrued: 0,
        negativeInterestAccrued: 0
      }
    },
    {
      encodedKey: '8a6ca8ad7f63d3ed017f8a0d2f400518',
      creationDate: '2022-03-14T15:28:42-06:00',
      lastModifiedDate: '2022-03-14T15:28:42-06:00',
      id: 'CD1561975322',
      name: 'cashback',
      accountHolderType: 'CLIENT',
      accountHolderKey: '8a6c82ce7f63da7a017f6598ff010028',
      accountState: 'APPROVED',
      productTypeKey: '8a6ca2c37d764b15017d7658e15c0003',
      accountType: 'CURRENT_ACCOUNT',
      approvedDate: '2022-03-14T15:28:43-06:00',
      currencyCode: 'MXN',
      internalControls: {},
      overdraftSettings: { allowOverdraft: false, overdraftLimit: 0 },
      interestSettings: { interestPaymentSettings: { interestPaymentDates: [] } },
      overdraftInterestSettings: {},
      balances: {
        totalBalance: 0,
        overdraftAmount: 0,
        technicalOverdraftAmount: 0,
        lockedBalance: 0,
        availableBalance: 0,
        holdBalance: 0,
        overdraftInterestDue: 0,
        technicalOverdraftInterestDue: 0,
        feesDue: 0,
        blockedBalance: 0,
        forwardAvailableBalance: 0
      },
      accruedAmounts: {
        interestAccrued: 0,
        overdraftInterestAccrued: 0,
        technicalOverdraftInterestAccrued: 0,
        negativeInterestAccrued: 0
      }
    }
  ];
}