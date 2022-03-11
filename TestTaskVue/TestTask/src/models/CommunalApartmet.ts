import type {Guid} from "guid-typescript"

export interface CommunalApartment{
    id: Guid,
    isPaid: boolean,
    includingTaxes: boolean,
    description: string,
    money : number,
    requiredDateOfPay : Date,
    actualDateOfPay : Date
};