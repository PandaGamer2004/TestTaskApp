import { ITEMS_PER_PAGE_COUNT } from "@/config/paginationOptions";
import type { CommunalApartment } from "@/models/CommunalApartmet";
import type { PriceFiltering } from "@/models/PriceFiltering";
import * as MutationKeys from "./mutationkeys";
import type { State } from "./state";

export const storeMutations =  {
    [MutationKeys.ADD_COMUNAL_APARTMENT](state : State,
        communalAppartment: CommunalApartment) : void{
       if(communalAppartment !== null){    
           state.comunalApartments.push(communalAppartment);
       }
   },
   [MutationKeys.ADD_RANGE_COMUNAL_APARTMENTS](state: State,
       apartmentsToAdd: Array<CommunalApartment>) : void
       {
           state.comunalApartments= [...state.comunalApartments, ...apartmentsToAdd];
       },

   [MutationKeys.SHOW_MODAL](state:State): void{
       state.isModalDisplayed = true;
   },
   [MutationKeys.HIDE_MODAL](state: State) : void{
       state.isModalDisplayed = false;
   },

   [MutationKeys.REMOVE_COMUNAL_APARTMENTS](state:State): void{
           state.selectedComunalAppartments.forEach(comunalApartmentToRemove => { 
                const entityIndexToDelete = state.comunalApartments
                    .findIndex((apart) => apart.id == comunalApartmentToRemove.id);
                state.comunalApartments.splice(entityIndexToDelete, 1); 
           });
       },

    

    [MutationKeys.SELECT_COMUNAL_APARTMENT](state : State,
        communalAppartmentsToSelect: CommunalApartment){
            console.log(communalAppartmentsToSelect)
            state.selectedComunalAppartments.push(communalAppartmentsToSelect);
        },

    [MutationKeys.UNSELECT_COMUNAL_APARTMENT](state: State, communalAppartmentToUnselect: CommunalApartment){
        const entityToUnselectIndex = state.selectedComunalAppartments.findIndex(item => item.id == communalAppartmentToUnselect.id);
        state.selectedComunalAppartments.splice(entityToUnselectIndex, 1);
    },

    [MutationKeys.CLEARE_SELECTED_COMUNAL_APARTMENTS](state: State){
        state.selectedComunalAppartments = [];
    },

    [MutationKeys.LOAD_NEXT_COMMUNAL_APPARTMENTS_PART](state: State){
        if(state.currentPage*ITEMS_PER_PAGE_COUNT < state.comunalApartments.length){
            state.currentPage++;
        }
    },

    [MutationKeys.SET_FILTER_PRICE_FROM](state: State, filterPriceFrom : number){
        state.filterPriceFrom = filterPriceFrom;
    },
    [MutationKeys.SET_FILTER_PRICE_TO](state: State, filterPriceTo : number){
        state.filterPriceTo = filterPriceTo;
    },
    [MutationKeys.SET_COMMUNAL_APARTMENTS_ORDERING](state: State, orderingProperties: string[]){
        state.communalApartmentsOrdering = orderingProperties;
    }
}; 