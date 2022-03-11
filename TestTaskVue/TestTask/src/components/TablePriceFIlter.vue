<script setup lang="ts">
import { useStore } from "@/store/store";
import { computed } from "vue";
import * as ActionKeys from "@/store/actionkeys";

const store = useStore();

const filterPriceFrom = computed({
    get(){
        return store.state.filterPriceFrom ?? 0; 
    },
    set(newFilterValue : number){
        store.dispatch(ActionKeys.SET_FILTER_PRICE_FROM, newFilterValue);
    }
});

const filterPriceTo = computed({
    get(){
        return store.state.filterPriceTo ?? 0; 
    },
    set(newFilterValue : number){
        store.dispatch(ActionKeys.SET_FILTER_PRICE_TO, newFilterValue);
    }
});







</script>


<template>
   <div class="filter-group">
        <div class="filter-item">
            <label for="startPrice">Price from: </label>
            <input type="number" v-model.lazy="filterPriceFrom" id="startPrice">
        </div>
        <div class="filter-item">
            <label for="endPrice">Price To: </label>
            <input type="number" v-model.lazy="filterPriceTo" id="endPrice">
        </div>
    </div> 
</template>

<style scoped>
.filter-group{
   display: flex;
   justify-content: center;
   margin-bottom: 20px;
}

.filter-item + .filter-item{
    margin-left: 10px;
}
.pretty-button{
    border: 1px;
    border-radius: 10px;
    padding: 10px;
    color: white;
}

.button-blue{
    background-color: #00A1D6;
}
.filter-group input{
    margin-top:7px
}

</style>