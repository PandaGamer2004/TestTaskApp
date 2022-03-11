import type { Guid } from "guid-typescript";
import type { CommunalApartment } from "./CommunalApartmet";

export class CommunalApartmentsDeletionModel{
    public modelIdsToDelete : Guid[];

    constructor(modelIdsToDelete: Guid[]){
        this.modelIdsToDelete = modelIdsToDelete;
    }
};