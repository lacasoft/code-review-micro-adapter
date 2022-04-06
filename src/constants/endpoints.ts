export const endpoints = {
    checkAssetAccountBalance: (assetAccount: number) => `/glaccounts/${assetAccount}`,
    checkAccounts: (accountHolderId: number) => `/deposits?detailsLevel=BASIC&accountHolderId=${accountHolderId}&accountHolderType=CLIENT`,
    createCashBackAccount: () => `/deposits/?=`,
    createCashBackToken: (accountId: string) => `/deposits/${accountId}/cards`,
    rechargeBalance: () => `/gljournalentries`,
    rechargeCBWalletBalance: (accountCBId: string) => `/deposits/${accountCBId}/deposit-transactions?=`
};
  