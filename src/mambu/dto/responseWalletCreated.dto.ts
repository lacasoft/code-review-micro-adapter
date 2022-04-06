import { Expose } from "class-transformer";

export class ResponseWalletCreated {
    @Expose({name: 'account_holder_key'})
    accountHolderKey: string;

    currency: string;

    id: string;
}