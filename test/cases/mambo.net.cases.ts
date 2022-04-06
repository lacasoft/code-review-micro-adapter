export namespace MambuNetCases {
    export const shouldRechage = [
        {
            "amount": 1,
            "campain": "Campaña demo test",
        },
    ];

    export const shouldRechargeCBWalletBalance = [
        {
            // "account_holder_id": 645416538,
            "account_cb_id": "FI5129242836",
            "amount": 1,
            "campain": "Campaña test",
            "transaction_id": "06367c0e-d6f7-4633-933a-f7e718fae8a5",
        },
    ];

    export const shouldRechargeAndCreateAccount = [
        {
            "account_holder_id": 208663124,
            "amount": 2.60,
            "currency": "MXN",
            "transaction_id": "06367c0e-d6f7-4633-933a-f7e718fae8a5",
            "campain": "Campaña test",
        },
        {
            "account_holder_id": 398143015,
            "amount": 2.60,
            "currency": "MXN",
            "transaction_id": "06367c0e-d6f7-4633-933a-f7e718fae8a5",
            "campain": "Campaña test",
        },
        {
            "account_holder_id": 645416538,
            "amount": 2.60,
            "currency": "MXN",
            "transaction_id": "06367c0e-d6f7-4633-933a-f7e718fae8a5",
            "campain": "Campaña test",
        },
        {
            "account_holder_id": 0,
            "amount": 2.60,
            "currency": "MXN",
            "transaction_id": "06367c0e-d6f7-4633-933a-f7e718fae8a5",
            "campain": "Campaña test",
        },
    ];


    export const failRechargeCBWalletBalance = [
        {
            "account_cb_id": "FI5129242836",
            "amount": 1900000,
            "campain": "Campaña test",
            "transaction_id": "06367c0e-d6f7-4633-933a-f7e718fae8a5",
        },
    ];
    export const failRechargeAndCreateAccount = [
        {
            "account_holder_id": 208663124,
            "amount": 1090000,
            "currency": "MXN",
            "transaction_id": "06367c0e-d6f7-4633-933a-f7e718fae8a5",
            "campain": "Campaña test",
        },
    ];
}