import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Expose } from "class-transformer";

export class RechargeCashbackWallet {
    @IsNotEmpty()
    @IsString()
    @Expose({name: 'account_cb_id'})
    accountCBId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;

    @IsNotEmpty()
    @IsString()
    campain: string;

    @IsNotEmpty()
    @IsString()
    @Expose({name: 'transaction_id'})
    transactionId: string;
}