import type { OrderingOptions } from '@/models/OrderingOptions';
import type { CommunalApartment } from './../models/CommunalApartmet';

export interface State{
    comunalApartments : Array<CommunalApartment>,
    isModalDisplayed: boolean
    selectedComunalAppartments: CommunalApartment[],
    currentPage: number,
    filterPriceFrom : number | null,
    filterPriceTo: number | null,
    orderingOptions: OrderingOptions,
    communalApartmentsOrdering : string[]
};