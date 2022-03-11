import * as MutationKeys from "./mutationkeys";
import axios from "axios";
import * as ApiUrls from "../config/apiEndpoints"
import type { CommunalApartment } from '@/models/CommunalApartmet';
import { CommunalApartmentsDeletionModel } from './../models/CommunalApratmentsDeletionModel';
import  * as ActionKeys from './actionkeys';
import type { PriceFiltering } from "@/models/PriceFiltering";

export const storeActions = {
    async [ActionKeys.LOAD_COMMUNAL_APARTMENTS]({commit}) : Promise<void>{
        try{
            const comunalApartmentsResponse = await axios.get(
                ApiUrls.COMMUNAL_APARTMENT_URL
            );
            const fetchedCommunalApartments : CommunalApartment[]
                 = comunalApartmentsResponse.data;
            
            fetchedCommunalApartments.forEach(apart => {
                apart.actualDateOfPay = new Date(apart.actualDateOfPay),
                apart.requiredDateOfPay = new Date(apart.requiredDateOfPay)
            });
            commit(MutationKeys.ADD_RANGE_COMUNAL_APARTMENTS,fetchedCommunalApartments)
        }catch(err){
            console.log(err);
        }
    },

    [ActionKeys.DELETE_SELECTED_COMMUNAL_APPARTMENTS]({commit}) : void{
        commit(MutationKeys.SHOW_MODAL, true);
    },
    
    
    async [ActionKeys.CONFIRM_DELETION]({commit, state}): Promise<void>{
        commit(MutationKeys.HIDE_MODAL, false);
        console.log("We are here");
        if(state.selectedComunalAppartments.length === 1){
            console.log("One selected")
            const apartmentToDelete = state.selectedComunalAppartments[0];
            try{
                await axios.delete(
                    ApiUrls.COMMUNAL_APARTMENT_URL + "/" + apartmentToDelete.id
                );
            }catch(err){
                console.log(err);
            }
        }else{
            const communalApartmentsToDeleteIds = state.selectedComunalAppartments.map(model => model.id);
            const deletionModel = new CommunalApartmentsDeletionModel(communalApartmentsToDeleteIds);
            await axios.delete(
                ApiUrls.COMMUNAL_APARTMENT_URL,
                {
                    data: deletionModel
                }
            );
        }

        commit(MutationKeys.REMOVE_COMUNAL_APARTMENTS);
        commit(MutationKeys.CLEARE_SELECTED_COMUNAL_APARTMENTS);
    },

    [ActionKeys.DENY_DELETION]({commit}): void{
        commit(MutationKeys.HIDE_MODAL);
    },
    
    [ActionKeys.SELECT_COMMUNAL_APPARTMENT]({commit}, communalAppartmentToSelect: CommunalApartment){
        commit(MutationKeys.SELECT_COMUNAL_APARTMENT, communalAppartmentToSelect);
    },

    [ActionKeys.UNSELECT_COMUNAL_APARTMENT]({commit}, communalApartmentToUnselect: CommunalApartment){
        commit(MutationKeys.UNSELECT_COMUNAL_APARTMENT, communalApartmentToUnselect);
    },

    [ActionKeys.USNSELECT_ALL_COMMUNAL_APARTMENTS]({commit}): void{
        commit(MutationKeys.CLEARE_SELECTED_COMUNAL_APARTMENTS);
    },

    [ActionKeys.LOAD_NEXT_COMMUNAL_APPARTMENTS_PART]({commit}): void{
        commit(MutationKeys.LOAD_NEXT_COMMUNAL_APPARTMENTS_PART);
    },
    
    [ActionKeys.SET_FILTER_PRICE_FROM]({commit}, filterPriceFrom : number){
        commit(MutationKeys.SET_FILTER_PRICE_FROM, filterPriceFrom);
    },

    [ActionKeys.SET_FILTER_PRICE_TO]({commit}, filterPriceTo: number){
        commit(MutationKeys.SET_FILTER_PRICE_TO, filterPriceTo);
    },
    [ActionKeys.SET_COMMUNAL_APARTMENTS_ORDERING]({commit}, orderingProperties: string[]){
        commit(MutationKeys.SET_COMMUNAL_APARTMENTS_ORDERING, orderingProperties);
    } 


}