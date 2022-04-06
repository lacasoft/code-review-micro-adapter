import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class RechargeCapitalBalance {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;

    @IsNotEmpty()
    @IsString()
    campain: string;
}