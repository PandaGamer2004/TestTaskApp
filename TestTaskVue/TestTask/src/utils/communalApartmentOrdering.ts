import type { CommunalApartment } from "@/models/CommunalApartmet";

export function orderComunalApartments(comunalApartmentsOrdering : string[], comunalApartmentsToOrder: CommunalApartment[]): void{
    if(comunalApartmentsOrdering.length !=0){
        comunalApartmentsToOrder
        .sort((first: CommunalApartment, next: CommunalApartment) => 
                    orderComunalApartmentsPair(first, next, comunalApartmentsOrdering))
    };
}


function orderComunalApartmentsPair(first: CommunalApartment, next: CommunalApartment, comunalApartmentsOrdering : string[]) : number{
    for(const idx in comunalApartmentsOrdering){
        const orderingProperty = comunalApartmentsOrdering[idx];
        const comprasionRes = getComprasionByOrderProperty(first, next, orderingProperty);
        if(comprasionRes !=0) return comprasionRes;
    }
    return 0;
}


function getComprasionByOrderProperty(first: CommunalApartment, next: CommunalApartment, orderingProperty: string) : number{
    let comprasionRes : number = 0;
    switch(orderingProperty){
        case "money":
            comprasionRes = first.money - next.money;
            break;
        case "requiredDateOfPay":
            comprasionRes = +first.requiredDateOfPay - +next.requiredDateOfPay;
            
            break;
        case "actualDateOfPay":
            comprasionRes = +first.actualDateOfPay - +next.actualDateOfPay;
            break;

        default:
            throw new Error("Unknown comprasion property")    
    }
    return comprasionRes;
}
