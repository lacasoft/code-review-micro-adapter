import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class RechargeAndCreateAccount {
    @Expose({name: 'account_holder_id'})
    @IsNotEmpty()
    @IsNumber()
    accountHolderId: number;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    campain: string;

    @Expose({name: 'transaction_id'})
    @IsNotEmpty()
    @IsString()
    transactionId: string;
    
    @IsNotEmpty()
    @IsString()
    currency: string;
}