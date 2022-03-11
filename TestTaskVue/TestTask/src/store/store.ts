import type { CommunalApartment } from '@/models/CommunalApartmet';
import { storeMutations } from './mutations';
import type { InjectionKey } from "vue";
import { createStore, type Store, useStore as baseUseStore } from "vuex";
import type { State } from "./state";
import { storeActions } from './actions';
import { ITEMS_PER_PAGE_COUNT } from '@/config/paginationOptions';
import { orderComunalApartments } from '@/utils/communalApartmentOrdering';
export const key: InjectionKey<Store<State>> = Symbol(); 



export const store = createStore<State>({
    state: {
        isModalDisplayed: false,
        comunalApartments : [],
        selectedComunalAppartments : [],
        currentPage : 1,
        filterPriceFrom: 0,
        filterPriceTo: null,
        orderingOptions : {
            actualDateOfPay: "Order by actual date of pay",
            requiredDateOfPay: "Order by required date of pay",
            money: "Order by amount of pay"
        },
        communalApartmentsOrdering : []
    },

    mutations: storeMutations,
    getters:{
       filterByPrice: (state: State) => (communalApartmentsToFilter: CommunalApartment[]) =>{
            if(state.filterPriceFrom !== null && state.filterPriceTo !== null){
                return communalApartmentsToFilter
                .filter(item => item.money >= state.filterPriceFrom! && item.money<=state.filterPriceTo!);
            }
            return communalApartmentsToFilter;
       },
       paginateCommunalApartments: (state: State) =>{
            return state.comunalApartments.slice(0, state.currentPage * ITEMS_PER_PAGE_COUNT);
       },
       getComunalApartments(state: State, getters) : CommunalApartment[]{
           let paginatedComunalAparments = getters.paginateCommunalApartments;
           paginatedComunalAparments = getters.filterByPrice(paginatedComunalAparments);
           orderComunalApartments(state.communalApartmentsOrdering, paginatedComunalAparments);

           return paginatedComunalAparments;
        },
    },
    actions : storeActions
})




export function useStore(){
    return baseUseStore(key);
}
