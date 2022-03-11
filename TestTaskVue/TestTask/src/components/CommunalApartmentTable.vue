<script setup lang="ts">
import type { CommunalApartment } from '@/models/CommunalApartmet';
import * as ActionKeys from '@/store/actionkeys';
import { useStore } from '@/store/store';
import { computed } from '@vue/runtime-core';
import {formatDate} from "@/utils/dataUtils";
import {getUniqueItemIdentifier} from "@/utils/templateUtils";
import TableDeletion from './TableDeletion.vue';
import TablePriceFilter from "./TablePriceFIlter.vue";
import TableOrdering from "./TableOrdering.vue";

const store = useStore();
await store.dispatch(ActionKeys.LOAD_COMMUNAL_APARTMENTS);
const communalAppartments  = computed<CommunalApartment[]>(()=> store.getters.getComunalApartments);
const selectdCommunalApartmets = computed<CommunalApartment[]>(() => store.state.selectedComunalAppartments);

function makeSelected(selectdCommunalApartmet : CommunalApartment){
    if(!store.state.selectedComunalAppartments.includes(selectdCommunalApartmet)){
        store.dispatch(ActionKeys.SELECT_COMMUNAL_APPARTMENT, selectdCommunalApartmet);
    }else{
    store.dispatch(ActionKeys.UNSELECT_COMUNAL_APARTMENT, selectdCommunalApartmet);
    }
}


</script>


<template>
    <TableDeletion/>
    <TablePriceFilter/>
    <TableOrdering/>
    <div class="table-wrapper">
        <table>
                <thead>
                    <th>
                        Payment options
                    </th>
                    <th>
                        Payment description
                    </th>
                    <th>
                        Payment amount
                    </th>
                    <th>
                        Payment dates
                    </th>
                    <th>
                        Actions
                    </th>
                </thead>
            <tbody>
                <template v-for="communalApartment in communalAppartments" :key="communalApartment.id">
                    <tr :class="{selected: selectdCommunalApartmets.includes(communalApartment)}">
                    <td>
                        <label :for="getUniqueItemIdentifier('isPaid', communalApartment.id)">Is Paid:</label>
                        <input :id="getUniqueItemIdentifier('isPaid', communalApartment.id)" type="checkbox" :checked="communalApartment.isPaid">
                        <label :for="getUniqueItemIdentifier('includingTaxes', communalApartment.id)">Including Taxes:</label>
                        <input :id="getUniqueItemIdentifier('includingTaxes' , communalApartment.id)" type="checkbox" :checked="communalApartment.includingTaxes">
                    </td>
                    <td>
                        <p>
                            {{communalApartment.description}}
                        </p>
                    </td>
                    <td>
                        <p>
                            Amount of pay: {{communalApartment.money}}
                        </p>
                    </td>
                    <td>
                        <p>Required date of pay: {{formatDate(communalApartment.requiredDateOfPay)}}</p>
                        <p>Actual date of pay: {{formatDate(communalApartment.actualDateOfPay)}}</p>
                    </td>
                    <td>
                        <div class="select-icon" @click="makeSelected(communalApartment)">
                                {{selectdCommunalApartmets.includes(communalApartment)? "&#9745" : "&#9744"}}
                        </div>
                    </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

.table-wrapper{
    width: fit-content;
    margin: 0 auto;
}
.table-wrapper table{
    border : 333333 1px solid;
    border-collapse: collapse;
}
.table-wrapper table th, td{
    text-align: center;
    padding: 15px;
} 
.table-wrapper thead{
    background-color: #333333;
    color: #E5E5E5;
}

.table-wrapper tr:nth-child(2n){
    background-color: #333333;
    color: #E5E5E5;
}
.table-wrapper tr:nth-child(2n+1)
{
     background-color: #E5E5E5;
     color: #1C1C1C;
}

.selected{
    border: #00A1D6 3px solid;
}
.select-icon{
    font-size: 2em;
}
</style>